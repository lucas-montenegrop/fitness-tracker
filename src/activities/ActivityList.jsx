import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityList({ activities, syncActivities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem 
        key={activity.id} 
        activity={activity} 
        syncActivities={syncActivities}
        
        />
      ))}
    </ul>
  );
}

function ActivityListItem({ activity, syncActivities}) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  async function tryDelete() {
    setError(null);
    try {
      await deleteActivity(token, activity.id);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <li>
      <p>{activity.name}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p>{error}</p>}
    </li>
  );
}
