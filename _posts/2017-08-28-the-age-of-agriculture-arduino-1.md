---
layout: post
author: donghyeon
title: "[대식물시대] 2. 아두이노를 처음 써보다."
description: "아두이노를 써보았습니다."
date: 2017-09-07
tags: ["대식물시대"]
comments: true
---



# 아두이노

아두이노는 내가 막 이 세계에 발을 들일 무렵부터 유명해지기 시작한 녀석이다. 아두이노에 대한 [자세한 내용](https://namu.wiki/w/Arduino)은 현대의 살아있는 역사서라 불리는 나무위키 사관들이 기록한 문서를 보면 된다. 오픈소스 하드웨어라 불리는 이 녀석이 왜 유용한지는 그 당시(대학교 2학년)에는 잘 몰랐고, 4학년에 올라가 직접 Atmel 칩을 가지고 보드를 설계하면서 알게 되었다. 지금 하고있는 소프트웨어 일도 그렇지만 아무것도 없는 상태에서 무언가 만들기란 참으로 막막한 일이다. 약간 MSG를 가미하여 극단적으로 비유하자면 이렇다. 

나는 아무 짐 없이 무인도에 떨어졌다. 이 곳은 사람이 단 한번도 살았던 적이 없는 곳이다. 무엇부터 해야할까. 막막하다. 우선 배가고프니 물고기를 잡아야겠는데, 낚시대를 만들어야 한다. 낚시대를 만들려면 낚시줄이 있어야 하는데 낚시줄은 어떻게 만들지? 바늘은 어떻게 하지? 불을 피워서 철광석을 제련해서 철을 얻은 다음 바늘을 만들어야하나? 막막하다. 해야 할 일이 끝이 없다. 무엇부터 해야할 지도 잘 모르겠고, 한참을 고민해서 나아가야 할 길을 찾아도 그 이후가 심지어 더 답이 없다. 철광석 제련을 어떻게 하나. 그러다 물고기 잡기 전에 배고프고 지쳐서 죽을 것이다.

반면 아두이노는 같은 무인도지만 모든 요구사항들이 풀 셋팅 되어있는 리조트 같은 느낌이라고 할 수 있다. 아무도 없는 섬이지만, 자유롭게 무엇이든 할 수 있다. 아, 앞에서도 충분히 자유롭긴 하였으니 '매우 편리하게' 라는 단어를 하나 덧붙여야겠다. 주변을 둘러보면 낚시대도 있고 그물도 있고 통발도 있고 떡밥도 있고 갯지렁이도 있고 뜰채도 있고, 심지어 낚시대 사용설명서라든지, 버튼하나만 누르면 동작해서 물고기를 잡아주는 시스템도 갖춰져있다. 그리고 잡아온 물고기를 조리실로 가져가면 냄비와 각종 조미료와 채소와 손질하는 법 등이 담겨있어, 요리를 안해봤어도 조금 노력하면 쉽게 맛있는 매운탕을 끓여먹을 수 있을 것이다. ~~괜히 매운탕으로 예를 들었다. 새벽인데 배고프다.~~

요는 그렇다. 어떤 아이디어('물고기를 잡는 것')를 실행해보기 위해서 예전 같으면 칩을 사서 각각의 핀을 이용할 수 있도록 전자적인 지식을 이용해 ~~두뇌를 풀가동하여~~ 회로를 구성하여 '개발보드'를 만든 뒤에야 간신히 빈 낚시대를 한번 드리워볼 수 있었다면, 지금은 아주 잘 만들어진, 그리고 구하기 쉽고 값싸고 일반적인 재료들로 만들어진 '개발보드'를 손쉽고 싸게 구할 수 있는 것이다. 

![작업하는 사진](/assets/images/0907aoa/작업사진.jpg)

어쨌든 그래서, 전자공학도의 길을 벗어난지 4년이 넘어 전자쪽으로 뇌가 청순한 상태인 나도 이런 시도를 해볼 수 있는 것이다.



### 아두이노로 하려고 했던 것

- 아두이노 여러개
  - 여러 센서에서 값 얻어오기
    - 온도, 습도, 조도, 양액의 PH, 양액의 온도, 수위 등
  - 식물 생장 LED 등 제어
  - 수중 펌프, 산소 발생기, Fan 제어
  - ~~Zigbee 통신을 이용해서 중계서버로 데이터 전송~~
  - esp8266을 통해 Wifi를 이용하여 데이터 전송



이전 글에 적었던 아두이노의 범위는 위와 같다. 약간 변경된 부분이 있고 향후 다른 부분들이 더 변경될 수 있을 것이다. 통신 방법의 변경에 대해서는 다음 포스트에서 다시 자세히 적겠다. 



### 아두이노로 해본 것

![작업 공간](/assets/images/0907aoa/선꼽기.jpg)

우선 여러가지 센서를 사용해보았는데, 첫번째로 사용한건 온도 센서였다. 사진에 보이는 중간의 초록색 녀석이다. 참, 온도센서가 아니라 정확히는 온-습도 센서이다. 자 그럼 일반적인 상식으로 온습도 센서라면 우리는 어떤 결과물을 기대할까? 아마 아래와 같은 모습일 것이다.

```
1. 아두이노를 킨다
2. 아두이노가 센서한테 값을 얻어오라고 한다.
3. 센서가 아두이노한테 현재 값을 보내준다.
	온도: 25.4도, 습도: 80%
4. 우왕ㅋ굳ㅋ
```

하지만 현실은 그렇게 녹록하지 않다. 우리는 아날로그로 사고하지만 쟤네들은 디지털 세상속에 존재들이기 때문이다. 흔히 디지털이 1과 0만 존재한다고 알고 있는데, 그렇다. 얘네는 1과 0으로 저 값들을 보내준다. 어떻게?

[온습도계의 데이터시트](https://akizukidenshi.com/download/ds/aosong/DHT11.pdf)를 보면 알 수 있다. 중간에 이런 내용이 있다.

![온습도계](/assets/images/0907aoa/데이터.png)

​				

> Calculate:
> 0011 0101+0000 0000+0001 1000+0000 0000= 0100 1101
> Received data is correct:
> Humidity:0011 0101=35H=53%RH
> Temperature:0001 1000=18H=24°C

즉, 전기적으로 5V, 0V 를 일정 주기마다 반복하며 0010101~~~ 의 신호를 만들어내고 그것을 읽어서 정해진 약속에 의해서 변환을 하고나면 우리는 이 값을 온도가 몇이고 습도가 몇인지를 알 수 있는 것이다. 왠지 다시 철광석을 제련해야 할 것만 같은 느낌적인 느낌을 받았다. 심지어 오랜만에 보니 RLC의 L이 뭔지도 기억이 안났어서 하 요걸 어떻게 하지 싶었는데,



#### 오옷…라이브러리 

온-습도를 알아서 읽어와서 변환해주는 라이브러리를 제공 해준다. 

```c++
int dht11::read(int pin)
{
	// BUFFER TO RECEIVE
	uint8_t bits[5];
	uint8_t cnt = 7;
	uint8_t idx = 0;

	// EMPTY BUFFER
	for (int i=0; i< 5; i++) bits[i] = 0;

	// REQUEST SAMPLE
	pinMode(pin, OUTPUT);
	digitalWrite(pin, LOW);
	delay(18);
	digitalWrite(pin, HIGH);
	delayMicroseconds(40);
	pinMode(pin, INPUT);

	// ACKNOWLEDGE or TIMEOUT
	unsigned int loopCnt = 10000;
	while(digitalRead(pin) == LOW)
		if (loopCnt-- == 0) return DHTLIB_ERROR_TIMEOUT;

	loopCnt = 10000;
	while(digitalRead(pin) == HIGH)
		if (loopCnt-- == 0) return DHTLIB_ERROR_TIMEOUT;

	// READ OUTPUT - 40 BITS => 5 BYTES or TIMEOUT
	for (int i=0; i<40; i++)
	{
		loopCnt = 10000;
		while(digitalRead(pin) == LOW)
			if (loopCnt-- == 0) return DHTLIB_ERROR_TIMEOUT;

		unsigned long t = micros();

		loopCnt = 10000;
		while(digitalRead(pin) == HIGH)
			if (loopCnt-- == 0) return DHTLIB_ERROR_TIMEOUT;

		if ((micros() - t) > 40) bits[idx] |= (1 << cnt);
		if (cnt == 0)   // next byte?
		{
			cnt = 7;    // restart at MSB
			idx++;      // next byte!
		}
		else cnt--;
	}

	// WRITE TO RIGHT VARS
        // as bits[1] and bits[3] are allways zero they are omitted in formulas.
	humidity    = bits[0]; 
	temperature = bits[2]; 

	uint8_t sum = bits[0] + bits[2];  

	if (bits[4] != sum) return DHTLIB_ERROR_CHECKSUM;
	return DHTLIB_OK;
}
```



그래서 그냥 아래와 같이 사용하면 된다. 회로와 소스에서 Pin만 제대로 설정 되어있다면 어렵지 않게 해볼 수 있다. 오랜만에 해봐서 약간 긴장했는데, 의외로 너무 할게 없었다. 옛날에는 ~~이래봐야 4년~5년전이지만..~~ 데이터시트를 보고 전부 값을 얻어오는 부분을 구현한 뒤에야 겨우 값을 얻어올 수 있었는데 시대가 변한 것인지, 아니면 그 때에는 라이브러리를 찾아볼 생각을 못했었던 것인지 모르겠지만, 아무튼 굉장히 편했다. 이래서 정말 아두이노로 비전공자 분들이 여러가지 아이디어를 실현해볼 수 있는 것이군이라는 생각도 들었다. 



```c
#include <dht11.h>
dht11 DHT11;

#define TEMP_PIN 8

void setup() {
  Serial.begin(9600);
  Serial.println("Hello arduino!!");
  pinMode(TEMP_PIN, INPUT);
}

void loop() {
  int chk = DHT11.read(TEMP_PIN);
  
  /* start temp pin read */
  Serial.print("Read sensor: ");
  switch (chk)
  {
    case DHTLIB_OK: 
                Serial.println("OK"); 
                break;
    case DHTLIB_ERROR_CHECKSUM: 
                Serial.println("Checksum error"); 
                break;
    case DHTLIB_ERROR_TIMEOUT: 
                Serial.println("Time out error"); 
                break;
    default: 
                Serial.println("Unknown error"); 
                break;
  }
  Serial.print("Humidity (%): ");
  Serial.println((float)DHT11.humidity, 2);

  Serial.print("Temperature (oC): ");
  Serial.println((float)DHT11.temperature, 2);
  Serial.println("====================");
  /* end temp pin read */

  delay(3000);

```

위 코드를 이용해서 serial port를 통해서 값을 출력한다. 

![초음파센서](/assets/images/0907aoa/월이.jpg)

월-E를 닮은 초음파 센서와 Gas 센서, 그리고 Liquid level sensor도 써보았다. 보통 복잡한 것들은 라이브러리를 제공해주는 편이었고, 간단한 것들은 데이터 시트를 읽고 알아서 구현하게끔 되어있었다. 이 외의 센서들에 대한 소스코드는 나중에 공개하도록 하겠다. 그런데 공개할만큼 내용이 유용하거나 양이 많지는 않다. 설정을 잘 해서 라이브러리를 잘 가져다 쓰면 되는거라..

![작업공간](/assets/images/0907aoa/작업공간.jpg)

1~2주일간 여러 센서를 다루어보았지만 사실, 그렇게 어려운 일은 아니었다. 데이터 시트를 적당히 읽을 수 있고 기본적인 회로에 대한 상식 정도만 있으면 가볍게 구성해서 다 사용해볼만 한 예제들이었다. 비전공자에게도 과연 엄청 쉬울까는 잘 모르겠지만, 프로젝트가 종료될 즈음해서 주변의 비전공자 몇명과 재미있는 장난감들을 만들어볼 계획인데 그때 알게 되겠지…?

다음 포스트에서는 아두이노로 제어(모터 가동, LED 점멸 등등)을 하는 내용 + 센서로부터 받은 값을 바탕으로 제어하는 것(e.g. 더울 때 선풍기 키기)을 다루어보겠다. 



끝.