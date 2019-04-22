import React, {Component} from 'react';
// import PropTypes from 'prop-types';

// import Chapters from './dummyCurriculum.js';
// import ch1 from './chapters/ch1.json';
// import ch2 from './chapters/ch2.json';
// import ch3 from './chapters/ch3.json';
// import ch4 from './chapters/ch4.json';
// import ch5 from './chapters/ch5.json';
// import ch6 from './chapters/ch6.json';
// import ch7 from './chapters/ch7.json';
// import ch8 from './chapters/ch8.json';

import jsonCurriculum from './data/jsonParser';
import fullCurriculum from './data/fullCurriculum.json'
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
    console.log(jsonCurriculum);
    const chaptersList = Object.entries(fullCurriculum).map(chapter => <CurriculumChapter key={chapter} chapter={chapter}/>);
    return chaptersList;
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