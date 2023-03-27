---
title: 디지털 이미지 개요
createdAt: 2023-03-27
summary: 다양한 이미지 표현 방식, 압축, 채널에 대해 알아보고 각 이미지 포맷의 특징에 대해 알아보자
categories: ['image format', 'image channel', 'raster image', 'vector graphic']
---

## 이미지 구분

### raster image

-   bitmap
-   확대하면 깨진다

### vector graphic

-   복잡한 이미지는 표현하기 너무 어렵다
-   geometric formulas

## 압축방식

### 손실 압축

-   이미지 퀄리티가 줄어들 수 있다
-   버리는 데이터가 존재한다
-   Descrete Cosine Transform(DCT) 알고리즘 사용

### 비손실 압축

-   데이터 손실 없다
-   Run-Length Encode(RLE) 알고리즘 사용

## 컬러채널

-   일반적으로 RGB 사용
-   전문가들은 CMYK도 많이 쓴다
-   일반적으로 채널당 8bit를 사용하는 8bpc 포멧을 사용한다
-   그래서 하나의 색을 표현하는데 24bit를 사용하기도 한다
-   RGB에 alpha 채널 a를 추가하기도 한다 → 투명도

## Raster Image Format

### Bitmap

-   픽샐을 그리드 형식으로 표현

### JPEG

-   Joint Photographic Experts Group
-   RGV, CMYK 컬러채널 사용
-   DCT lossy 알고리즘 사용
-   no alpha channel

### PNG

-   Portable Network Graphic
-   비손실 압축
-   include alpha channel
-   no CMYK
-   PNG32 → 32bpc

### GIF

-   비손실 압축
-   애니메이션 사용 가능
-   8bit 이미지 사용으로 적은 용량 관리

### TIFF

-   옵션 진짜 다양하게 제공

## Vector Image Format

-   이미지를 수학적으로 저장
-   보통 AI 확장자를 많이 쓴다
-   SVG는 W3C에서 제안해서 www환경에서 많이 사용된다
