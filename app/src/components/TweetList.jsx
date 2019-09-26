import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { fetchTweets } from '../utils/api';
import { profileImagePath } from '../utils/config';


const useStyles = makeStyles(theme => ({
  liRoot: {
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  liAvatar: {
    marginTop: theme.spacing(0.5),
  },
  liText: {
    margin: 0,
  },
  liPrimary: {
    fontSize: 16,
  },
  liPrimaryHandle: {
    fontWeight: 600,
  },
  liPrimaryDate: {
    fontWeight: 300,
  },
  avatar: {
    width: 50,
    height: 50,
  },
}));

function formatTweetDate(date) {
  const createDate = moment(date);
  const now = moment();

  const duration = moment.duration(now.diff(createDate));
  if (duration.as('hours') < 24) {
    if (duration.as('minutes') < 60) {
      if (duration.as('seconds') < 60) {
        return `${Math.floor(duration.as('seconds'))}s`;
      }
      return `${Math.floor(duration.as('minutes'))}m`;
    }
    return `${Math.floor(duration.as('hours'))}h`;
  }

  if (createDate.year() === now.year()) {
    return createDate.format('MMM D');
  }

  return createDate.format('MMM D, YYYY');
}

function TweetList({ handle, getHandleTweets }) {
  const classes = useStyles();
  const [tweets, setTweets] = React.useState([]);

  React.useEffect(() => {
    fetchTweets(handle)
      .then(setTweets)
      .catch(console.error);
  }, [handle, getHandleTweets]);

  return (
    <>
      {tweets.length > 0 && (
        <List dense>
          {tweets.map(tweet => (
            <ListItem key={tweet.id} className={classes.liRoot}>

              <ListItemAvatar className={classes.liAvatar}>
                <Avatar
                  aria-label={`${handle} portrait`}
                  alt={`${handle} portrait`}
                  src={`${profileImagePath}${handle}`}
                  className={classes.avatar}
                />
              </ListItemAvatar>

              <ListItemText
                className={classes.liText}
                primary={(
                  <>
                    <Typography
                      component="span"
                      className={`${classes.liPrimary} ${classes.liPrimaryHandle}`}
                    >
                      {`@${handle}`}
                    </Typography>
                    <Typography
                      component="span"
                      className={`${classes.liPrimary} ${classes.liPrimaryDate}`}
                    >
                      {` ⋅ ${formatTweetDate(tweet.createdAt)}`}
                    </Typography>
                  </>
                )}
                secondary={(
                  <Typography variant="caption" component="p">
                    {tweet.body}
                  </Typography>
                )}
              />

            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

TweetList.defaultProps = {
  getHandleTweets: true,
};

TweetList.propTypes = {
  handle: PropTypes.string.isRequired,
  getHandleTweets: PropTypes.bool,
};

export default TweetList;
