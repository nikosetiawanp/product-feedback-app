export default function CategoryButton(props: {
  categoryName: string;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const setCategory = () => {
    props.setCategoryFilter(props.categoryName);
  };
  return (
    <button
      onClick={setCategory}
      className={
        props.categoryFilter === props.categoryName ? "active" : "inactive"
      }
    >
      {props.categoryName}
    </button>
  );
}
