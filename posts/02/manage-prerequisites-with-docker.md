# Manage Prerequisites With Docker
In this post I'll present how we manage prerequisites with Docker. I assume you have basic knowledge about Docker and writing Dockerfiles.

## Introduction 
Every project has 3rd party prerequisites and dependencies it depends on. The prerequisites can be for build time or for runtime. In this post I’ll talk only about build time, but the same applies to run time as well.
Why is it important to manage what the project depends on? The first reason is because otherwise it will be hard for other developers to get into the project and use it. Another reason is that you want to build your project exactly the same every time. Without knowing the dependencies, it might be built with different versions or tools and might cause unexpected behaviour.
## Other solutions
There are dependency managers that handle libraries for specific languages such as [Pypi](https://pypi.org/) for Python and [npm](https://www.npmjs.com/) for JS for example. This is a good option for specific languages only, but it won’t help in the case of dependencies on operating systems, tools or libraries.
Another option is to define these prerequisites in the README.md file. The problem is that the README.md file is not enforced and it is easy to forget some prerequisites.

## Manage with Docker
Another option is to maintain the prerequisites in a Dockerfile. The Dockerfile is the file which defines the instructions on how to create the container.  
Let’s take for example the “hellomake” project from this Makefile [tutorial](https://www.cs.colby.edu/maxwell/courses/tutorials/maketutor/). The “hellomake” project is implicitly dependent on two external tools - GCC and Make. And it is unclear what version of these tools is being used. I’ll add a Dockerfile.
```
FROM debian:sid-slim

RUN apt-get update && apt-get install -y \
	make \
	gcc-8=8.4.0-3

WORKDIR /hellomake

ENTRYPOINT [ "make" ]
```
In this Dockerfile, there is a definition of two things that the original project didn’t have. The first is a clear definition of the base image - in this case debian:sid-slim (defined by the FROM keyword). The second thing is the GCC version: `gcc-8=8.4.0-3`. Now every usage of this project will have the exact same prerequisites. 
The `ENTRYPOINT [ "make" ]` makes it simpler to work with the container, but it is optional, and every project should adapt to its needs.

When there is a need to perform a change in the project that affects the prerequisites, there is the need to update one place only - the Dockerfile:
```
$ docker run -it -v `pwd`/src:/hello  hellomake CC=arm-linux-gnueabi-gcc
arm-linux-gnueabi-gcc -c -o hellomake.o hellomake.c -I.
make: arm-linux-gnueabi-gcc: Command not found
make: *** [Makefile:11: hellomake.o] Error 127
```
And it requires the following update to work;
```
-       gcc-8=8.4.0-3
+       gcc-9=9.3.0-12 \
+       gcc-arm-linux-gnueabi-9=9.3.0-12
```
