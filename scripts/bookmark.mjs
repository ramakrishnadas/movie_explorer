class Bookmark {
    constructor() {
      this.bookmarks = this.getAllBookmarks();
    }
  
    addMovie(movieTitle) {
      if (!this.bookmarks.includes(movieTitle)) {
        this.bookmarks.push(movieTitle);
        this.updateLocalStorage();
      }
      
    }
  
    removeMovie(movieTitle) {
      const index = this.bookmarks.findIndex((item) => item === movieTitle);
  
      if (index !== -1) {
        // Remove the movie from bookmarks array
        this.bookmarks.splice(index, 1);
  
        // Save the updated bookmarks to localStorage
        this.updateLocalStorage();
      }
    }
  
    getAllBookmarks() {
      // Retrieve bookmarks from localStorage and parse them
      const storedBookmarks = localStorage.getItem('bookmarks');
      return storedBookmarks ? JSON.parse(storedBookmarks) : [];
    }
  
    clearBookmarks() {
      // Clear bookmarks array and remove from localStorage
      this.bookmarks = [];
      localStorage.removeItem('bookmarks');
    }
  
    updateLocalStorage() {
      // Save the updated bookmarks to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    }
  }
  
  export default Bookmark;