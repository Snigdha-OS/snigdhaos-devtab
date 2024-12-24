import { Clock } from '../Clock';
import { SearchBar } from '../Search/SearchBar';
import { Bookmarks } from '../Bookmarks/Bookmarks';
import { TodoList } from '../TodoList';
import { Notes } from '../Notes/Notes';
import { Calendar } from '../Calendar/Calendar';
import { DevToFeed } from '../DevTo/DevToFeed';

export function MainContent() {
  return (
    <div className="space-y-8">
      <Clock />
      <SearchBar />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Bookmarks />
        </div>
        <Calendar />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TodoList />
        <Notes />
      </div>
      
      <DevToFeed />
    </div>
  );
}