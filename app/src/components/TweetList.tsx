import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Favorite as FavoriteIcon, FavoriteBorder as NonFavoriteIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import React, { ReactElement, useEffect, useState } from 'react';
import { fetchFavorites, fetchToggleFavorite, fetchTweets } from '../utils/api';
import { profileImagePath } from '../utils/config';
import { AppTheme } from './Theme';

const useStyles = makeStyles((theme: AppTheme) => ({
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
  favoriteButton: {
    padding: 0,
    color: red[500],
  },
}));

function formatTweetDate(date: string) {
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

type TweetListProps = {
  handle: string;
  getHandleTweets?: boolean;
  favorites?: boolean;
};

type TweetSchema = {
  body: string;
  createdAt: string;
  creatorHandle: string;
  id: string;
  isFavorite: boolean;
};

export function TweetList(props: TweetListProps): ReactElement {
  const { handle, getHandleTweets = true, favorites = false } = props;
  const classes = useStyles();
  const [tweets, setTweets] = useState<TweetSchema[]>([]);

  const getTweets = (targetHandle: string) => {
    if (favorites) {
      fetchFavorites(targetHandle).then(setTweets).catch(console.error);
    } else {
      fetchTweets(targetHandle).then(setTweets).catch(console.error);
    }
  };

  useEffect(() => getTweets(handle), [handle, getHandleTweets]);

  const handleFavorite = async ({ id }: TweetSchema) => {
    try {
      await fetchToggleFavorite(id);
      const nextTweets = tweets.map((t) => (t.id !== id ? t : { ...t, isFavorite: !t.isFavorite }));
      setTweets(nextTweets);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {tweets.length > 0 && (
        <List dense>
          {tweets.map((tweet) => (
            <ListItem key={tweet.id} className={classes.liRoot}>
              <ListItemAvatar className={classes.liAvatar}>
                <Avatar
                  aria-label={`${tweet.creatorHandle} portrait`}
                  alt={`${tweet.creatorHandle} portrait`}
                  src={`${profileImagePath}${tweet.creatorHandle}`}
                  className={classes.avatar}
                />
              </ListItemAvatar>

              <ListItemText
                className={classes.liText}
                disableTypography
                primary={
                  <>
                    <Typography
                      component="span"
                      className={`${classes.liPrimary} ${classes.liPrimaryHandle}`}
                    >
                      {`@${tweet.creatorHandle}`}
                    </Typography>
                    <Typography
                      component="span"
                      className={`${classes.liPrimary} ${classes.liPrimaryDate}`}
                    >
                      {` ⋅ ${formatTweetDate(tweet.createdAt)}`}
                    </Typography>
                  </>
                }
                secondary={
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="caption">{tweet.body}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <IconButton
                        className={classes.favoriteButton}
                        onClick={() => handleFavorite(tweet)}
                      >
                        {tweet.isFavorite === true ? <FavoriteIcon /> : <NonFavoriteIcon />}
                      </IconButton>
                    </Grid>
                  </Grid>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
