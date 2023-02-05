const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return 0
  const favorite = blogs.reduce((min, max) => min.likes > max.likes ? min : max)
  return {
    'title': favorite.title,
    'author': favorite.author,
    'likes': favorite.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}