import React, {Component} from 'react';
import propTypes from 'prop-types';
import CurriculumSubChapter from './CurriculumSubChapter';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
  chapterCard: {
    width: 500,
    float: "left",
    margin: '10px',
  },
  avatar: {
    backgroundColor: '#272634',
    color: '#FFFFFF',
  },
  expandIcon: {
    float: 'right',
  },
  expandIconOpen: {
    transform: "rotate(180deg)",
  }
};

class CurriculumChapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  handleExpandClick = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    const {classes} = this.props;
    const {title, progress, subChapters} = this.props.chapter;

    const subChapterComponents = subChapters.map(subChapter => <CurriculumSubChapter key={subChapter.id} subChapter={subChapter} />);

    return (
      <Card className={classes.chapterCard}>
        <CardHeader
          avatar={
            <Avatar aria-label={title} className={classes.avatar}>
              {progress}%
            </Avatar>
          }
          title={title}
        />
        <CardActions className={classnames(classes.expandIcon, {[classes.expandIconOpen]: this.state.expanded})} disableActionSpacing>
          <IconButton
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Expand" 
          >
            <ExpandMoreIcon/>
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} unmountOnExit>
          <CardContent>
            {subChapterComponents}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

CurriculumChapter.propTypes = {
  classes: propTypes.object.isRequired,
}

export default withStyles(styles)(CurriculumChapter);