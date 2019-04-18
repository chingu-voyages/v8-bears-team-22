import React from 'react';
import CurriculumTask from './CurriculumTask';
import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
  subChapterDrawers: {
    width: "100%",
  },
  subChapterHeading: {
    fontSize: "1.2em",
  }
}

const CurriculumSubChapter = (props) => {
  const {classes} = props;
  const {title, tasks} = props.subChapter;

  const taskComponents = tasks.map(task => <CurriculumTask key={task.id} task={task}/>)

  return (
    <ExpansionPanel className={classes.subChapterDrawer}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
        <Typography className={classes.subChapterHeading}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {taskComponents}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

CurriculumSubChapter.propTypes = {
  classes: propTypes.object.isRequired,
};

export default withStyles(styles)(CurriculumSubChapter);