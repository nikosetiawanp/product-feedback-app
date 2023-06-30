import CategoryFilter from "./CategoryFilter";
import RoadmapStatus from "./RoadmapStatus";

export default function MobileSidebar(props: {
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  plannedLength: number;
  inProgressLength: number;
  liveLength: number;
}) {
  return (
    <div className="mobile-sidebar">
      <div className="mobile-sidebar-card">
        <CategoryFilter
          categoryFilter={props.categoryFilter}
          setCategoryFilter={props.setCategoryFilter}
        />

        <RoadmapStatus
          plannedLength={props.plannedLength}
          inProgressLength={props.inProgressLength}
          liveLength={props.liveLength}
        />
      </div>
    </div>
  );
}
