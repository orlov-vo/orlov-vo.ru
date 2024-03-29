---
title: Какой язык программирования выбрать в 2018 году
slug: kakoj-yazyk-programmirovaniya-vybrat-v-2018
date: 2017-10-19
draft: false
thumbnail: /images/2017/kakoj-yazyk-programmirovaniya-vybrat-v-2018.jpg
words: 1020
aliases:
    [
        /2017/10/19/kakoj-yazyk-programmirovaniya-vybrat-v-2018/,
        /posts/kakoj-yazyk-programmirovaniya-vybrat-v-2018/,
    ]
tags:
    - программирование
    - рейтинг
summary:
    Проблема идущая из года в год затрагивает умы как начинающего поколения программистов так и уже
    состоявшихся энтузиастов. В социальных сетях, на форумах и различных ресурсах ведутся священные
    войны за выбор лучшего языка программирования.
---

![Cloud of Languages](/images/2017/kakoj-yazyk-programmirovaniya-vybrat-v-2018.jpg)

Проблема идущая из года в год затрагивает умы как начинающего поколения программистов так и уже
состоявшихся энтузиастов. В социальных сетях, на форумах и различных ресурсах ведутся священные
войны за выбор лучшего языка программирования. Приводятся различные сравнения производительности на
моделированных задачах, когда один язык позволяет быстрее решить задачу.

Но выбрав язык на вооружение по бенчмаркам, вскоре понимаешь минусы, начинаешь чувствовать
дискомфорт. Например выбрав очередного "убийцу X", ты сталкиваешься со следующими проблемами: слабо
развитое коммьюнити, малое количество доступных библиотек.

# Рейтинг TIOBE

Есть другая альтернатива выбора, по рейтингам. Один из известных рейтингов, который оценивает по
количеству специалистов на рынке, количеству курсов, а также поисковых запросов является
[TIOBE](https://www.tiobe.com/tiobe-index/). Важным замечанием будет то, что в рейтинге нет оценки
какой лучший язык или на котором было написано больше кода.

Давайте посмотрим данный рейтинг, рассмотрим первую десятку лидеров. Каждому я постараюсь дать
собственный комментарий. На момент написания заметки (Октябрь 2017) рейтинг выглядит следующим
образом:

## 1. Java

```java
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

Любимчик больших компаний, позволяет писать софт, который запускается на любой операционной системе,
которая поддерживает установку виртуальной машинный Java (JVM). Данный язык насаждает
объектно-ориентированную парадигму, заставляя писать под любую прихоть классы.

Есть беда с оперативной памятью, она заключается в том, что операции выделения и очистки памяти
берет на себя виртуальная машина. Нужно уметь правильно тюнить виртуальную машину, чтобы софт не
зависал при очистке памяти.

В наше время, после изучения данного языка программирования, советую присмотреться к языкам
основанным на работе с JVM, такие как: Scala, Kotlin и др. Они позволяют писать быстрее и красивее,
а также использовать библиотеки под Java. Но нужно понимать как работает все внутри, поэтому без
изучения Java в эти языки лучше не лезть.

## 2. C

```c
#include <stdio.h>

int main (void)
{
  printf ("Hello, World!\n");
  return 0;
}
```

Обязательно к изучению, для понимания основ системного программирования. Позволяет писать
эффективные программы, которые экономично используют память. Но важно знать то, что данный язык
позволяет стрелять себе по ногам, не защищая тебя от критичных ошибок в runtime, утечек памяти и
т.д.

За время существования языка было написано много библиотек и примеров. Проблемы с этим языком
начинаются во время поиска работы, нужно иметь уверенное знания этого языка, а также эффективных
алгоритмов и принципы оптимизации. В добавок нужны проекты за спиной. С проектами можно решить
проблему: заказав например Arduino, собрав что-то интересное и продемонстрировав на собеседовании.

Для дальнейшего развития советую рассмотреть следующих кандидатов: Rust и Assembly Language. Первый
сохранит вам ноги, оставив возможности писать компактные исполняемые файлы, второй позволит
углубится в работу процессора.

## 3. C++

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!";
    return 0;
}
```

Советую изучать после C, чтобы было понимание как все хранится внутри и как работать с памятью и
т.д. Хотя C++ позволяет писать очень хороший код, который сложно завалить, но случаи с отстрелом ног
тут учащаются из-за очень богатых возможностей самого языка.

На минуточку: это один из языков, который невозможно изучить на все 100%. С каждым годом выходят
новые стандарты, которые позволяют писать код лучше и быстрее.

Мне больше всего в этом языке нравится стандартная библиотека (STL), которой хватает на большинство
потребностей. А если её не хватает, то можно подключить Boost. :)

## 4. C

```csharp
using System;
namespace HelloWorld
{
    class Hello
    {
        static void Main()
        {
            Console.WriteLine("Hello, World!");
        }
    }
}
```

Отличный язык программирования, позволяет писать отличный софт, который хорошо будет себя проявлять
в крупных и средних компаниях.

Возможности языка позволяют ему создавать десктопные, мобильные (Xamarin) и серверные приложения.

Для дальнейшего развития, можно рассмотреть язык Go для написания сетевых программ. Он прост в
освоении, насаждает единый стиль написания кода, поэтому очень удобный в крупных командах.

## 5. Python

```python
print("Hello, World!")
```

До сих пор неизвестный мне чудик, который я все еще не начал изучать. Наслышан о нем как о легком
языке, с которого можно начинать путь программиста.

Из минусов слышал, что проблемы с паралельным выполнением кода и скоростью исполнения кода по
сравнению с компилируемыми языками.

Однако почему стоит начать учить его: очень много библиотек и с недавним трендом к машинному
обучению, данный язык является лучшим выбором из-за выбора ML-библиотек.

## 6. JavaScript

```js
console.log('Hello, World!');
```

По мне так язык будущего, который очень долго будет расти. С каждым годом производители браузеров
ускоряют исполнения программ, оптимизируя как сами движки так и программы, которые туда загружаются.

Новые стандарты радуют глаз. А если их не хватает или нужна поддержка старых движков, есть
возможность использовать трансплитеры такие как: Babel, TypeScript, ~~ClojureScript~~,
~~CoffeScript~~.

Для развития советую изучать TypeScript, который вносит очень крутые плюшки в ваш код, делая его
очень стабильным.

## 7. PHP

```php
<?php
echo "Hello, World!\n";
```

Мой первый язык программирования. Сейчас уже давно его не использую, хотя иногда встречаются задачи,
когда нужно подправить на сайте у клиента какой-то участок кода.

## 8. Visual Basic .NET

```basic
Module Hello
  Sub Main()
      MsgBox("Hello, World!")
  End Sub
End Module
```

Честно не понимаю как он тут оказался. Для меня является языком программирования для начинающих, не
несущих дальнейших ценностей в становлении программиста. Лучше возьмите Java, C, JS или Python для
изучения, с ними вы хоть работу интересную найдете

## 9. Assembly Language

```x86asm
.model small
.stack 100h

.data
msg	db	'Hello world!$'

.code
start:
	mov	ah, 09h   ; Display the message
	lea	dx, msg
	int	21h
	mov	ax, 4C00h  ; Terminate the executable
	int	21h
end start
```

Ассемблер позволяет писать код напрямую для процессора, без использования языков программирования.
Хоть ассемблер и является языком, но считать за язык его сложно из-за эквивалентности его

Советую начинать изучать после основ системного программирования (язык C для начала).

## 10. Ruby

```ruby
puts 'Hello, world!'
```

Популярность данный язык получил благодоря чудесному фреймворку Ruby on Rails. Изучать возможно
стоит, если планируется работать с данным фреймворкам. Хотя судя по трендам, сейчас идет отток
Ruby-программистов. Многие переходят на что-то другое. Слышал много рубистов перешли на Elixir.

## Заключение

В качестве заключения, хочу сказать, что выбирать язык программирования сложно, необходимо смотреть
на задачи, которые вы им будете решать. Или смотреть на используемые стеки в вакансиях, которые вам
хочется занять.

Не ограничивайтесь языками, представленными здесь! Есть много прекрасных языков.

Точного могу сказать, что есть тренды отхода от ООП в сторону ФП. Поэтому стоит изучать
функциональные языки, ради общего развития как специалиста. Но не стоит останавливаться на одном
языке, изучайте всегда новые технологии, не применяйте их на боевых проектах, пробуйте их на
домашних.

На этом у меня все! До новых встреч!
