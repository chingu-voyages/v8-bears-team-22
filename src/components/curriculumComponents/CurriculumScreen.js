import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import Chapters from './dummyCurriculum.js';
import CurriculumChapter from './CurriculumChapter';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  chapters: {
    // display: 'grid',
  },
}

class CurriculumScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalProgress: 0
    };
  }

  get chapters() {
    return Chapters.map(chapter => <CurriculumChapter key={chapter.id} chapter={chapter}/>);
  }

  render() {

    const {classes} = this.props;
    return (
      <div className={classes.chapters}>
        {this.chapters}
      </div>
    )
  }
}

export default withStyles(styles)(CurriculumScreen);