import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class HomeContainer extends Component {
  constructor(props, context) {
    super(props, context)

    this.onClick = this.onClick.bind(this);
  }

  onClick (e) {
    e.preventDefault();
    const input = document.getElementById('search-archive');
    const value = input.value;

    if (!value) {
      return;
    } else {
      return this.context.router.history.push(`/${value}`);
    }
  }

  render () {
    return (
      <section id="home-page" className="home-page row">
        <h2>Plucking items right out of archive.org</h2>
        <div className="starter-clicks col-12">
          <h5 className="text-center">Here are some items I found. Click one and take a look.</h5>
          <Link to={`/160723Drnobenefit_video`} className="suggested-thumbs">
            <img src="https://archive.org/services/img/160723Drnobenefit_video" alt="Click to see more." />
          </Link>
          <Link to={`/SpaceSoundsVenus`} className="suggested-thumbs">
            <img src="https://archive.org/services/img/SpaceSoundsVenus" alt="Click to see more." />
          </Link>
          <Link to={`/0577_Logic_by_Machine_15_01_03_00`} className="suggested-thumbs">
            <img src="https://archive.org/services/img/0577_Logic_by_Machine_15_01_03_00" alt="Click to see more." />
          </Link>
          <Link to={`/WORKRIHANNAViolinCover`} className="suggested-thumbs">
            <img src="https://archive.org/services/img/WORKRIHANNAViolinCover" alt="Click to see more." />
          </Link>
          <Link to={`/JOE2018-09-01.AUD.FLAC`} className="suggested-thumbs">
            <img src="https://archive.org/services/img/JOE2018-09-01.AUD.FLAC" alt="Click to see more." />
          </Link>
          <Link to={`/InformationM`} className="suggested-thumbs">
            <img src="https://archive.org/services/img/InformationM" alt="Click to see more." />
          </Link>
          <Link to={`/misc-old-sf-maps`} className="suggested-thumbs">
            <img src="https://archive.org/services/img/misc-old-sf-maps" alt="Click to see more." />
          </Link>
          <Link to={`/BjorkBjork`} className="suggested-thumbs">
            <img src="https://archive.org/services/img/BjorkBjork" alt="Click to see more." />
          </Link>
          <Link to={`/jacquespepinsfas00ppin`} className="suggested-thumbs">
            <img src="https://archive.org/services/img/jacquespepinsfas00ppin" alt="Click to see more." />
          </Link>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="search-archive">If you know the specific id of the thing you are looking for, use this: </label>
            <input
              id="search-archive"
              type="text"
              className="form-control"
              id="search-archive"
              aria-describedby="search-the-internet-archvie"
              placeholder="Type file name here" />
          </div>
          <button type="submit" className="btn btn-lg btn-info" onClick={this.onClick}>Let's do it.</button>
        </form>
      </section>
    )
  }
}

HomeContainer.contextTypes = {
  router: PropTypes.object
};

export default HomeContainer;