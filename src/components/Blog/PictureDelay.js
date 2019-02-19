import Picture from 'gatsby-image'

class PictureDelay extends Picture {
    constructor(props) {
      super(props);
      this.loadPictures = this.loadPictures.bind(this);
    }
  
    loadPictures() {
      console.log("Loading pictures...");
      this.setState({ isVisible: true });
    }
  
    componentDidMount() {
      super.componentDidMount();
  
      if (typeof window !== "undefined") {
        window.addEventListener("load", this.loadPictures);
        window.setTimeout(this.loadPictures, 1000);
      }
    }
    componentWillUnmount() {
      //super.componentWillUnmount();
      if (typeof window !== "undefined") {
        window.removeEventListener("load", this.loadPictures);
      }
    }
}
export default PictureDelay