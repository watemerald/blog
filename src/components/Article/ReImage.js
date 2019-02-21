import { Link, graphql, StaticQuery } from 'gatsby';
import Picture from 'gatsby-image';
import React from 'react';
import { ThemeContext } from "../../layouts";

function locateImage(props) {
  const filteredPosts = props.data.images.edges.filter(edge => {
    const piecesOfPath = edge.node.childImageSharp.fluid.src.toString().split("/")
    const imageName = piecesOfPath[piecesOfPath.length-1]
    return imageName.includes(props.src);
  })  
  if (filteredPosts.length != 1) {
    throw ("ReImage error! Expected to locate 1 image for " + props.src + ", instead located " + filteredPosts.length);
  }
  const fluid = filteredPosts[0].node.childImageSharp.fluid
  return fluid
}

const ReImage = props => {
  const fluid = locateImage(props)
  
  return (
      <ThemeContext.Consumer>
        {theme => (
          <React.Fragment>
              <Picture
              fluid={fluid}
              style={{
                transition: '3000ms'
              }}
              className="test"
              />
              <style jsx>{`
              .test img {
                transition: 3000ms !important;
              }
              .test picture {
                  transition: 3000ms !important;
              }
              img {
                  transition: 3000ms !important;
              }
              picture {
                  transition: 3000ms !important;
              }
              `}</style>
          </React.Fragment>
        )}
      </ThemeContext.Consumer>
  );
};

// TODO: replace this awful hack with a plugin that does the transformation.
export default props => (
  <StaticQuery
    //eslint-disable-next-line no-undef
    query={graphql`
      query {
        images: allFile(filter: { absolutePath: { regex: "//(posts|pages)/[0-9]+.*--.*(jpg|jpeg|png|gif)$/" } }) {
          edges {
            node {
              absolutePath
              id
              size
              extension
              childImageSharp {
                fluid(maxWidth: 800, quality: 70, traceSVG: { color: "#f9ebd2", blackOnWhite: true }) {
                    originalImg
                    tracedSVG
                    src
                    srcSet
                    aspectRatio
                    srcSetWebp
                    sizes
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <ReImage data={data} src={props.src} title={props.title} />
    )}
  />
)