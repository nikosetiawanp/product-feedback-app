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
}) {
  const [replyFormIsActive, setReplyFormIsActive] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const [replies, setReplies] = useState([
    {
      content: "",
      id: "",
      product_request_id: "",
      parent_id: null,
      user: {
        name: "",
        username: "",
        image: "",
      },
    },
  ]);
  const handleReplyInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReplyInput(event.target.value);
    },
    []
  );

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

  // console.log(data);

  const renderedReplies = replies.map((reply) => (
    <Reply
      content={reply.content}
      parentId={props.id}
      productRequestId={props.productRequestId}
      key={reply.id}
      name={reply.user.name}
      username={reply.user.username}
      image={reply.user.image}
    />
  ));

  const handleReplySubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const { data, error } = await supabase.from("comments").insert([
      {
        product_request_id: `${props.productRequestId}`,
        content: `${replyInput}`,
        parent_id: `${props.id}`,
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
              <h3>{props.name}</h3>
              <h4>@{props.username}</h4>
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
          <p>{props.content}</p>

          {replyFormIsActive && (
            <form
              className="reply-form"
              action="submit"
              onSubmit={handleReplySubmit}
            >
              <textarea
                name="reply-input"
                id="reply-input"
                className="reply-input"
                maxLength={250}
                cols={30}
                rows={5}
                contentEditable
                onChange={handleReplyInputChange}
              ></textarea>
              <button className="textarea-submit-button">Post Reply</button>
            </form>
          )}
        </div>
      </div>
      <div className="comment-nested-container">
        {replies.length !== 0 && renderedReplies}
      </div>
    </div>
  );
}
