import React from 'react';
import '../Styles/Comments.css';

const CommentList = ({ comments }) => {
  return (
    <div>
      <div className="row d-flex justify-content-center mt-100 mb-100">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body text-center">
              <h4 className="card-title">Latest Comments</h4>
            </div>
            {comments.map((comment) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
