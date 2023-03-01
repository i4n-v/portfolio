'use client';

import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import ICarouselProps from './types';

export default function Carousel({ data, renderItem, keyExtractor }: ICarouselProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const slide = useRef<HTMLUListElement>(null);
  const navigation = useRef<HTMLDivElement>(null);
  const distances = useRef({ finalPosition: 0, startX: 0, movement: 0, lastMovement: 0 });
  const activeSlideItem = useRef(0);

  useEffect(() => {
    function slidePosition(slideElement: HTMLLIElement) {
      if (wrapper.current) {
        const gap = (wrapper.current.offsetWidth - slideElement.offsetWidth) / 2;
        return -(slideElement.offsetLeft - gap);
      }

      return 0;
    }

    const listItems: any[] = Array.from(slide.current?.children || []);
    const mapedListItems = listItems.map((element: HTMLLIElement) => ({
      element,
      position: slidePosition(element),
    }));

    const navigationButtons = Array.from(navigation.current?.children || []);

    function changeActiveTab() {
      navigationButtons.forEach((button) => {
        button.classList.remove(styles.activeTab);
      });

      navigationButtons[activeSlideItem.current].classList.add(styles.activeTab);
    }

    function transition(boolean: boolean) {
      if (slide.current) slide.current.style.transition = boolean ? 'transform 0.3s' : '';
    }

    function changeActiveClass() {
      mapedListItems.forEach(({ element }) => {
        element.classList.remove(styles.active);
      });

      mapedListItems[activeSlideItem.current].element.classList.add(styles.active);
    }

    function moveSlide(distX: number) {
      if (slide.current) {
        distances.current.lastMovement = distX;
        slide.current.style.transform = `translate3d(${distX}px, 0, 0)`;
      }
    }

    function changeSlideItem(index: number) {
      const activeSlide = mapedListItems[index];
      moveSlide(activeSlide.position);
      distances.current.finalPosition = activeSlide.position;
      changeActiveTab();
      changeActiveClass();
    }

    function activePrevSlideItem() {
      if (activeSlideItem.current > 0) {
        activeSlideItem.current -= 1;
        changeSlideItem(activeSlideItem.current);
      }
    }

    function activeNextSlideItem() {
      if (activeSlideItem.current < mapedListItems.length - 1) {
        activeSlideItem.current += 1;
        changeSlideItem(activeSlideItem.current);
      }
    }

    function updateMovement(clientX: number) {
      distances.current.movement = (distances.current.startX - clientX) * 1.1;
      return distances.current.finalPosition - distances.current.movement;
    }

    function onMouseMove(event: MouseEvent) {
      const finalPostion = updateMovement(event.clientX);
      moveSlide(finalPostion);
    }

    function onTouchMove(event: TouchEvent) {
      const finalPostion = updateMovement(event.changedTouches[0].clientX);
      moveSlide(finalPostion);
    }

    function onMouseStart(event: MouseEvent) {
      transition(false);
      event.preventDefault();
      distances.current.startX = event.clientX;
      wrapper.current?.addEventListener('mousemove', onMouseMove);
    }

    function onTouchStart(event: TouchEvent) {
      transition(false);
      distances.current.startX = event.changedTouches[0].clientX;
      wrapper.current?.addEventListener('touchmove', onTouchMove);
    }

    function changeSlideItemOnEnd() {
      if (distances.current.movement > 120 && activeSlideItem.current < mapedListItems.length - 1) {
        activeNextSlideItem();
      } else if (distances.current.movement < -120 && activeSlideItem.current > 0) {
        activePrevSlideItem();
      } else {
        changeSlideItem(activeSlideItem.current);
      }
    }

    function onMouseEnd() {
      transition(true);
      distances.current.finalPosition = distances.current.lastMovement;
      wrapper.current?.removeEventListener('mousemove', onMouseMove);
      changeSlideItemOnEnd();
    }

    function onTouchEnd() {
      transition(true);
      distances.current.finalPosition = distances.current.lastMovement;
      wrapper.current?.removeEventListener('touchmove', onTouchMove);
      changeSlideItemOnEnd();
    }

    navigationButtons.forEach((button, index) => {
      if (index === 0) button.classList.add(styles.activeTab);

      button.addEventListener('click', () => {
        activeSlideItem.current = index;
        changeActiveClass();
        changeSlideItem(index);
      });

      button.addEventListener('touchend', () => {
        activeSlideItem.current = index;
        changeActiveClass();
        changeSlideItem(index);
      });
    });

    wrapper.current?.addEventListener('mousedown', onMouseStart);
    wrapper.current?.addEventListener('touchstart', onTouchStart);
    wrapper.current?.addEventListener('mouseup', onMouseEnd);
    wrapper.current?.addEventListener('touchend', onTouchEnd);

    return () => {
      wrapper.current?.removeEventListener('mousedown', onMouseStart);
      wrapper.current?.removeEventListener('touchstart', onTouchStart);
      wrapper.current?.removeEventListener('mouseup', onMouseEnd);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      wrapper.current?.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div ref={wrapper} className={styles.carousel}>
      <ul ref={slide}>
        {data.map((item, index) => (
          <li
            key={keyExtractor ? keyExtractor(item) : index}
            className={index === 0 ? styles.active : ''}
          >
            {renderItem ? renderItem(item) : null}
          </li>
        ))}
      </ul>
      <div ref={navigation}>
        {data.map((_, index) => (
          <button type="button" key={`button-${index}`} />
        ))}
      </div>
    </div>
  );
}
