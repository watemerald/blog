import { Link, graphql, StaticQuery } from 'gatsby';
import Picture from 'gatsby-image';
import React from 'react';
import { ThemeContext } from "../../layouts";

const ReImg = ({ rehyped }) => {
    const props = JSON.parse(rehyped)
    //delete props['base64']
    console.log(props);

    return (
      <ThemeContext.Consumer>
        {theme => (
            <React.Fragment>
              <Picture
              fluid={props}
              style={{
                width: "100%"
              }}
              />
              <br/><br/>
              <img src={props.tracedSVG} style={{ width: '100%' }}></img>
          </React.Fragment>
        )}
      </ThemeContext.Consumer>
  );
};

export default ReImg;