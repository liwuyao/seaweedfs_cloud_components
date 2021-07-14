let url = process.env.NODE_ENV === 'development'?`/api/cluster/OIRALFFFRI61FN6LOY3S0R7FO7FC3C5A`:`/cluster/${localStorage.clusterId}`
export default{
    dirPath:url
}