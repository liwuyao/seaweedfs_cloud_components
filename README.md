# Development

## Setup Agent to an existing SeaweedFS cluster

```
docker run -ti chrislusf/seaweed_agent:latest swagent -filer <filerHost>:<filerPort>

Or use a specific version:

docker run -ti chrislusf/seaweed_agent:v0.0.2 swagent -filer <filerHost>:<filerPort>

```

## Setup SeaweedFS cluster with Agent
Run make to startup a docker cluster,
with a SeaweedFS cluster and an SeaweedFS agent.

```
git clone https://github.com/seaweedfs/seaweedfs_cloud_components.git
cd seaweedfs_cloud_components
make
```

To add some files:
```
$ docker exec -ti seaweedfs_mount_1 /bin/sh
/ # ls
bin            entrypoint.sh  lib            opt            run            sys            var
data           etc            media          proc           sbin           tmp
dev            home           mnt            root           srv            usr
/ # cd /mnt/seaweedfs/
/mnt/seaweedfs #  cp -Rf /lib .
/mnt/seaweedfs # ls -al lib/
total 3927
drwxr-xr-x    1 root     root             0 Jul  1 19:58 .
drwxr-xr-x    1 root     root             0 Jul  1 19:25 ..
drwxr-xr-x    1 root     root             0 Jul  1 19:58 apk
drwxr-xr-x    1 root     root             0 Jul  1 19:58 firmware
-rwxr-xr-x    1 root     root        604744 Jul  1 19:58 ld-musl-x86_64.so.1
-rwxr-xr-x    1 root     root        183936 Jul  1 19:58 libapk.so.3.12.0
lrwxr-xr-x    1 root     root             0 Jul  1 19:58 libc.musl-x86_64.so.1 -> ld-musl-x86_64.so.1
-rwxr-xr-x    1 root     root       2605752 Jul  1 19:58 libcrypto.so.1.1
-rwxr-xr-x    1 root     root        523752 Jul  1 19:58 libssl.so.1.1
lrwxr-xr-x    1 root     root             0 Jul  1 19:58 libz.so.1 -> libz.so.1.2.11
-rwxr-xr-x    1 root     root        100168 Jul  1 19:58 libz.so.1.2.11
drwxr-xr-x    1 root     root             0 Jul  1 19:58 mdev
drwxr-xr-x    1 root     root             0 Jul  1 19:58 modules-load.d
drwxr-xr-x    1 root     root             0 Jul  1 19:58 sysctl.d
drwxr-xr-x    1 root     root             0 Jul  1 19:58 udev
/mnt/seaweedfs #

```
Or use filer
```
http://localhost:8634/
```

## Read Data from Agent

The agent would print out some link similar to this:
```
agent_1   | ---
agent_1   | Free Monitoring Data URL:
agent_1   | http://152.70.115.230:25683/cluster/ZMVUWTQPGXBE2H3M34YESQXC8FFCZ85K
agent_1   | ---

```

In this example,
```

seaweedfs$ curl http://152.70.115.230:25683/cluster/ZMVUWTQPGXBE2H3M34YESQXC8FFCZ85K | jq .
{
  "size_response": {
    "directory": "/",
    "size": 22415961649,
    "sizes": {
      "buckets": 22390000000,
      "etc": 214
    }
  }
}
seaweedfs$ curl http://152.70.115.230:25683/cluster/ZMVUWTQPGXBE2H3M34YESQXC8FFCZ85K/buckets | jq .
{
  "size_response": {
    "directory": "/buckets",
    "size": 22390000000,
    "sizes": {
      "warp-benchmark-bucket": 22390000000
    }
  }
}
seaweedfs$ curl http://152.70.115.230:25683/cluster/ZMVUWTQPGXBE2H3M34YESQXC8FFCZ85K/buckets/warp-benchmark-bucket | jq .
{
  "size_response": {
    "directory": "/buckets/warp-benchmark-bucket",
    "size": 22390000000,
    "sizes": {
      "GaZPCguT": 5610000000,
      "U9Mat4uw": 5630000000,
      "kpixoXUk": 5560000000,
      "mklpF0XX": 5590000000
    }
  }
}

```
