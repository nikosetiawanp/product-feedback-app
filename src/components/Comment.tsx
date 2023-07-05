import Reply from "./Reply";
import { useState, useCallback, useEffect } from "react";
import { supabase } from "../client";

export default function Comment(props: {
  id: string;
  content: string;
  productRequestId: string;
  name: string;
  username: string;
  image: string;
  isLoading: boolean;
}) {
  const profileUsername = localStorage.getItem("username");
  const [replyFormIsActive, setReplyFormIsActive] = useState(false);
  const [replyInputIsEmpty, setReplyInputIsEmpty] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const handleReplyInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReplyInput(event.target.value);
    },
    []
  );
  const [replies, setReplies] = useState([
    {
      content: "",
      id: "",
      product_request_id: "",
      parent_id: null,
      replying_to: "",
      user: {
        name: "",
        username: "",
        image: "",
      },
    },
  ]);

  async function fetchReplies() {
    const { data, error } = await supabase
      .from("comments")
      .select(`*,  user ( * )`)
      .eq("parent_id", props.id);

    if (data !== null) {
      setReplies(data);
    } else console.log(error);
  }
  useEffect(() => {
    fetchReplies();
  }, []);

  const renderedReplies = replies.map((reply) => (
    <Reply
      content={reply.content}
      parentId={props.id}
      productRequestId={props.productRequestId}
      key={reply.id}
      name={reply.user.name}
      username={reply.user.username}
      image={reply.user.image}
      replyingTo={reply.replying_to}
      isLoading={props.isLoading}
    />
  ));

  const handleReplySubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (replyInput.trim() === "") {
      setReplyInputIsEmpty(true);
      return;
    }

    const { data, error } = await supabase.from("comments").insert([
      {
        product_request_id: `${props.productRequestId}`,
        content: replyInput,
        parent_id: `${props.id}`,
        user: profileUsername,
        replying_to: props.username,
      },
    ]);
    console.log(data, error);
    location.reload();
  };

  return (
    <div className="comment-container">
      <div className="comment">
        <img src={props.image} alt="user-image" />
        <div className="contents">
          <div className="user-info-and-reply-button">
            <div className="user-info">
              <h3>{!props.isLoading ? props.name : "Loading..."}</h3>
              {!props.isLoading ? <h4>@{props.username}</h4> : "Loading..."}
            </div>
            <button
              className="reply-button"
              onClick={() => {
                setReplyFormIsActive(!replyFormIsActive);
              }}
            >
              Reply
            </button>
          </div>
          <p>{!props.isLoading ? props.content : "Loading..."}</p>

          {replyFormIsActive && (
            <form
              className="reply-form"
              action="submit"
              onSubmit={handleReplySubmit}
            >
              <div className="reply-input-container">
                <textarea
                  name="reply-input"
                  id="reply-input"
                  className={
                    !replyInputIsEmpty ? "reply-input" : "reply-input-error"
                  }
                  maxLength={250}
                  cols={30}
                  rows={5}
                  contentEditable
                  onChange={handleReplyInputChange}
                ></textarea>
                {replyInputIsEmpty && (
                  <p className="empty-message">Can't be empty</p>
                )}
              </div>

              <button className="textarea-submit-button">Post Reply</button>
            </form>
          )}
        </div>
      </div>
      <div className="comment-nested-container">
        {!props.isLoading && replies.length > 0 && renderedReplies}
      </div>
    </div>
  );
}
