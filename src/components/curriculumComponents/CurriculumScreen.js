import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import Chapters from './dummyCurriculum.js';
import ch1 from './chapters/ch1.json';
import ch2 from './chapters/ch2.json';
import ch3 from './chapters/ch3.json';
import ch4 from './chapters/ch4.json';
import ch5 from './chapters/ch5.json';
import ch6 from './chapters/ch6.json';
import ch7 from './chapters/ch7.json';
import ch8 from './chapters/ch8.json';
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
    const chaptersList = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8]
    return chaptersList.map(chapter => <CurriculumChapter chapter={chapter}/>);
    // return 
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