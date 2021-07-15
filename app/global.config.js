let url = process.env.NODE_ENV === 'development'?`/api/cluster/T151MC38YHTXW7HXDMZ86L47Q5IB9CBT`:`/cluster/${localStorage.clusterId}`
export default{
    dirPath:url
}