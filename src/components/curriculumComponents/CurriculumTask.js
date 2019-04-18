import React from 'react';
import CurriculumSubTask from './CurriculumSubTask';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';

const styles = {
  taskList: {
    width: '100%',
  },
};

const CurriculumTask = (props) => {
  const {classes} = props;
  const {title, url, isCompleted, subTasks} = props.task;

  const subTaskComponents = subTasks.map(subTask => <CurriculumSubTask key={subTask.id} subTask={subTask}/>);

  return (
    <List className={classes.taskList}>
      <ListItem dense button>
        <Checkbox 
          checked={isCompleted}
        />
        <ListItemText primary={title} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Url" href={url}>
            <LinkIcon/>
          </IconButton>
        </ListItemSecondaryAction>
        <div>{subTaskComponents}</div>
      </ListItem>
    </List>
    
  );
}

CurriculumTask.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurriculumTask);