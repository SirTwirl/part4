const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sumLikes = blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
    return sumLikes
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    return blogs.reduce((max, blog) => {
        return blog.likes > max.likes ? blog : max
    })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCounts = lodash.countBy(blogs, 'author')

  const topAuthor = lodash.maxBy(Object.keys(authorCounts), (author) => authorCounts[author])

  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const groupedByAuthor = lodash.groupBy(blogs, 'author')

  const authorLikes = lodash.map(groupedByAuthor, (authorBlogs, author) => {
    return {
      author: author,
      likes: lodash.sumBy(authorBlogs, 'likes')
    }
  })

  return lodash.maxBy(authorLikes, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}