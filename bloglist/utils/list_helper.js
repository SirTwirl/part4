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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}