import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../core/store";
import { RequestState } from "../../core/utils/request";
import { ProblemBox } from "./ProblemBox";
import { ProblemState, requestProblems } from "./store/problemSlice";

export const ProblemBoard = () => {
  const md = 3;
  const sm = 6;
  const xs = 12;
  const lg = 2;
  const maxWidth = 400;
  const minWidth = 300;
  const { problems, requestState } = useSelector<RootState, ProblemState>(
    (state) => state.problem
  );
  const dispatch = useDispatch();

  // Requests problems
  useEffect(() => {
    dispatch(requestProblems());
  }, [dispatch]);

  return (
    <div style={{ padding: 16 }}>
      {requestState === RequestState.Loading || requestState === RequestState.None && <div>Loading ...</div>}
      {requestState === RequestState.Ready && (
        <Grid container spacing={3}>
          {problems?.leetcode.map(
            ({ id, name, url, difficulty, tags, solution }) => {
              return (
                <Grid
                  key={id}
                  item
                  xs={xs}
                  sm={sm}
                  md={md}
                  lg={lg}
                  style={{ maxWidth, minWidth }}>
                  <ProblemBox
                    id={id}
                    url={url}
                    name={name}
                    difficulty={difficulty}
                    tags={tags}
                    solution={solution}/>
                </Grid>
              );
            }
          )}
        </Grid>
      )}
      {requestState === RequestState.Failure && <div>Something went wrong while loading data</div>}
    </div>
  );
};