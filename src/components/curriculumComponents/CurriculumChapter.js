import React, {Component} from 'react';
import propTypes from 'prop-types';
import CurriculumItem from './CurriculumItem';
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
      expanded: false, 
      progress: "22",

    }
  }

  handleExpandClick = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  renderItems = (itemsList) => {
    // return itemsList.map(item => console.log(item));
    return itemsList.map(item => <CurriculumItem key={item} item={item}/>);
  }

  render() {
    const {classes, chapter} = this.props;
    const {progress} = this.state;
    const chapterTitle = chapter[0];
    const chapterItems = chapter[1];

    return (
      <Card className={classes.chapterCard}>
        <CardHeader
          avatar={
            <Avatar aria-label="Progress" className={classes.avatar}>
              {progress}%
            </Avatar>
          }
          title={chapterTitle}
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
            {this.renderItems(chapterItems)}
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