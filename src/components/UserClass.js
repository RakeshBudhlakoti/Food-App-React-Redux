// Class Based Components
import React from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    // Create State Variable
    this.state = {};

  }
  componentDidMount() {
   // console.log(this.props.name+" Child componentDidMount called");
  }
  render() {
    const { name, title, imageSrc, description } = this.props;
    const { count } = this.state;
    //console.log(this.props.name+" Child Render");
    return (
      <div className="team-card">
        <img src={imageSrc} alt={name} className="team-card__image" />
        <h3 className="team-card__name">{name}</h3>
        <p className="team-card__title">{title}</p>
        <p className="team-card__description">{description}</p>
      </div>
    );
  }
}

export default UserClass;
