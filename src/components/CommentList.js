import React from 'react';
import '../Styles/Comments.css';
import UserContext from '../context/UserContext';
import Spinner from './OneBookView';

const CommentList = ({comments}) => {
  const state = React.useContext(UserContext);
  console.log(comments);
  console.log(state.comments, "COMENTS --------");
  //if(state.comments) {

   /* const commentsList = state.comments
      .filter((comment, index) => index >= state.comments.length - 5)
      .reverse()
      .map((comment) => (
        <div className="comment-widgets">
          <div className="d-flex flex-row comment-row m-t-0">
            <div className="p-2">
              <img
                src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583336/AAA/4.jpg"
                alt="user"
                width="50"
                className="rounded-circle"
              />
            </div>
            <div className="comment-text w-100">
              <h6 className="font-medium">RANDOM DUDE</h6>{' '}
              <span className="m-b-15 d-block">{comment} </span>
              <div className="comment-footer">
                <span className="text-muted float-right">April 14, 2019</span>
              </div>
            </div>
          </div>
        </div>
      ));*/
  //}


  const commentsList = comments
    .map((comment) => (
      <div className="comment-widgets">
        <div className="d-flex flex-row comment-row m-t-0">
          <div className="p-2">
            <img
              src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583336/AAA/4.jpg"
              alt="user"
              width="50"
              className="rounded-circle"
            />
          </div>
          <div className="comment-text w-100">
            <h6 className="font-medium">RANDOM DUDE</h6>{' '}
            <span className="m-b-15 d-block">{comment.comment} </span>
            <div className="comment-footer">
              <span className="text-muted float-right">April 14, 2019</span>
            </div>
          </div>
        </div>
      </div>
    ));
  return (
    <div>


    <div className="row d-flex justify-content-center mt-100 mb-100">
      <div className="col-lg-6">
        <div className="card">
          <div className="card-body text-center">
            <h4 className="card-title">Latest Comments</h4>
          </div>
          {commentsList}
        </div>
      </div>
    </div>

    </div>
  );
};

export default CommentList;
