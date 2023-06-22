import CategoryFilter from "./CategoryFilter";
import RoadmapStatus from "./RoadmapStatus";

export default function MobileSidebar(props: {
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="mobile-sidebar">
      <div className="mobile-sidebar-card">
        <CategoryFilter
          categoryFilter={props.categoryFilter}
          setCategoryFilter={props.setCategoryFilter}
        />

        <RoadmapStatus />
      </div>
    </div>
  );
}
