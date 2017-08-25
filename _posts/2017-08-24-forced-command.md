---
layout: post
title: "ssh 명령어를 제한하기"
author: donghyeon
description: "ssh forced command란 무엇인지 알아봅시다."
date: 2017-08-24
tags: [linux]
comments: true
---

## ssh forced command

SSH를 이용하면 remote machine의 interactive login session을 얻거나 command들을 실행할 수 있다. 그런데 여러가지 이유로 user에 따라 command를 제한해야할 때가 있다. 예를들면 해당 서버의 cron job만 주기적으로 실행하고 싶다거나 scp로 파일을 주기적으로 받거나 보내고 싶을 때를 예로 들 수 있겠다. 

위와 같은 경우에 유용하게 사용할 수 있는 방법이 있는데 ssh forced command 라고 부른다고 한다. 단 이 방법을 이용하기 위해서는 user가 connection을 할 때 반드시 key-based authentication을 사용해야 한다. 



아래의 예는 user가 해당 서버에서 scp command만 실행할 수 있도록 제한 하는 내용이다.

```bash
$vi /home/USER/.ssh/authorized_keys

no-port-forwarding,no-agent-forwarding,no-X11-forwarding,no-pty,command="scp -v -r -d -t /home/USER/foo/bar" ssh-rsa AAAAB3NzaC...
```



위를 약간 응용하면 실행할 수 있는 command list를 별도로 관리할 수도 있다. 

```bash
$vi /home/USER/.ssh/authorized_keys

no-port-forwarding,no-agent-forwarding,no-X11-forwarding,no-pty,command="/home/USER/.ssh/foo-command.sh" ssh-rsa AAAAB3NzaC...


$vi /home/USER/foo/bar-command.sh

#!/bin/sh
#

case "$SSH_ORIGINAL_COMMAND" in
    "ps -ef")
        ps -ef
        ;;
    "shutdown -r now")
        shutdown -r now
        ;;
    *)
        echo "Access denied"
        exit 1
        ;;
esac
```
