import type { PlasmoGetOverlayAnchor, PlasmoGetOverlayAnchorList, PlasmoMountShadowHost, PlasmoCreateShadowRoot } from "plasmo"

import type { PlasmoCSConfig, PlasmoCSUIProps, PlasmoRender } from "plasmo"
import type { FC } from "react"
import { createRoot } from "react-dom/client";


const getOverlayAnchor: PlasmoGetOverlayAnchor = async (point) => document.querySelector(point)

const getOverlayAnchorList: PlasmoGetOverlayAnchorList = async (point) => document.querySelectorAll(point)

type HookPoint = FC<PlasmoCSUIProps>;

type injectionOptions = {
  config?: PlasmoCSConfig
  byId?: string
  byQuery?: string
  elem?: JSX.Element
  hookPoint?: HookPoint
  getOverlayAnchor?: PlasmoGetOverlayAnchor
  getOverlayAnchorList?: PlasmoGetOverlayAnchorList
  mountShadowHost?: PlasmoMountShadowHost
  createShadowRoot?: PlasmoCreateShadowRoot
};

class Inject {
  config: PlasmoCSConfig
  render: PlasmoRender
  getRootContainer: () => Promise<unknown>
  constructor() { }

  configure = (options: PlasmoCSConfig) => {
    this.config = options
  }

  getConfig = (): PlasmoCSConfig => this.config

  getRootContainerConfig = () => this.getRootContainer

  getRootContainerBy = (selector, getElementFn) => {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const rootContainer = getElementFn(selector);
        if (rootContainer) {
          clearInterval(checkInterval);
          resolve(rootContainer);
        }
      }, 137);
    });
  };

  getAllImageIds = (): string[] => {
    // Retrieve all images in the webpage
    const images: HTMLCollectionOf<HTMLImageElement> = document.getElementsByTagName('img');

    // Array to store the image IDs
    const imageIds: string[] = [];

    // Iterate over each image element and extract the ID
    for (let i = 0; i < images.length; i++) {
      const image: HTMLImageElement = images[i];
      const imageId: string = image.id;

      // Add the image ID to the array if it exists
      if (imageId) {
        imageIds.push(imageId);
      }
    }
    // Output the image IDs
    console.log(imageIds);;
    return imageIds;
  }


  // Custom functions for getting elements
  private querySelectorFn = (selector) => document.querySelector(selector);
  private getElementByIdFn = (selector) => document.getElementById(selector);

  // Class methods using the generalized function and custom functions
  injectByQuery = (q) => {
    this.getRootContainer = () => this.getRootContainerBy(q, this.querySelectorFn);
  };

  injectById = (id) => {
    this.getRootContainer = () => this.getRootContainerBy(id, this.getElementByIdFn);
  };


  getRenderer = () => this.render

  renderElem = (elem: JSX.Element) => {
    this.render = async ({ createRootContainer }) => {
      const rootContainer = await createRootContainer()
      const root = createRoot(rootContainer)
      root.render(elem)
    }
  }

  replaceUI = (options: injectionOptions) => {
    if (options.byId) this.injectById(options.byId)
    if (options.byQuery) this.injectByQuery(options.byQuery)
    if (options.elem) this.renderElem(options.elem)
    if (options.config) this.configure(options.config)
  }

  // Replace all images in a web page with JSX element
  replaceImage = (elem: JSX.Element) => {
    // Retrieve all images in the webpage
    const images = this.getAllImageIds();

    for (let i = 0; i < images.length; i++) {
      const imageId: string = images[i];
      const imageElement: HTMLElement = document.getElementById(imageId);
      const parentElement: HTMLElement = imageElement.parentElement;
      parentElement.removeChild(imageElement);
      this.appendChild(elem, parentElement.id);
    }

  }

  // Appends JSX element to component with given id
  appendChild = (elem: JSX.Element, id: string) => {
    const parentElement: HTMLElement = document.getElementById(id);
    if (parentElement) {
      // validating whether parent element exists
      const root = createRoot(parentElement);
      root.render(elem);
    }
  }

  // Insert an element before a certain element
  insertBeforeElement = (parent: HTMLElement, succeedingElement: HTMLElement, child: HTMLElement) => {
    parent.insertBefore(child, succeedingElement);
  }

  // Insert an element as the first child of another element
  insertAsFirst = (parent: HTMLElement, child: HTMLElement) => {
    this.insertBeforeElement(parent, parent.firstChild as HTMLElement, child);
  }

  // Change background color (given hex as input) of element with given id
  backgroundColorChange = (id: string, color: string) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      element.style.backgroundColor = color;
    }
  }

  // Modify text content of an element with a given id
  modifyText = (id: string, text: string) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      element.textContent = text;
    }
  }

  // Remove an element from the DOM
  removeElement = (id: string) => {
    const element: HTMLElement = document.getElementById(id);
    if (element && element.parentNode) {
      // validating whether element and its parent exists
      element.parentNode.removeChild(element);
    }
  }

  // Toggle visibility of element with given id
  toggleDisplay = (id: string) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      element.style.display = (element.style.display === 'block') ? 'none' : 'block';
    }
  }

  // Toggle enable/disable of button with given id
  toggleButton = (id: string) => {
    const element: HTMLButtonElement = document.getElementById(id) as HTMLButtonElement;
    if (element) {
      // validating whether element exists
      element.disabled = !element.disabled;
    }
  }

  // Add a CSS class to an element
  addClass = (id: string, className: string) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      element.classList.add(className);
    }
  }

  // Remove a CSS class from an element
  removeClass = (id: string, className: string) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      element.classList.remove(className);
    }
  }

  // Add an event listener to an element
  addEventListener = (id: string, event: string, callback: () => void) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      element.addEventListener(event, callback);
    }
  }

  // Remove an event listener from an element
  removeEventListener = (id: string, event: string, callback: () => void) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      element.removeEventListener(event, callback);
    }
  }

  // Set the inner HTML of an element
  setInnerHTML = (id: string, html: string) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      element.innerHTML = html;
    }
  }

  // Replace element with given id with JSX element
  replaceElement = (elem: JSX.Element, id: string) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      const parentElement: HTMLElement = element.parentElement;
      const elementToRemove: HTMLElement = document.getElementById(id);
      parentElement.removeChild(elementToRemove);
      this.appendChild(elem, parentElement.id);
    }
  }

  // Set the value of an input element
  setValue = (id: string, value: string) => {
    const inputElement: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement) {
      // validating whether element exists
      inputElement.value = value;
    }
  }

  // Set an attribute on an element
  setAttribute = (id: string, attribute: string, value: string) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      element.setAttribute(attribute, value);
    }
  }

  // Scroll to a specific position within an element
  scrollToPosition = (id: string, x: number, y: number) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      element.scrollTo(x, y);
    }
  }

  // Set the width of an element
  setWidth = (id: string, width: string) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      element.style.width = width;
    }
  }

  // Set the height of an element
  setHeight = (id: string, height: string) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      element.style.height = height;
    }
  }

  // Set the position of an element
  setPosition = (id: string, position: string) => {
    const element: HTMLElement = document.getElementById(id);
    if (element) {
      // validating whether element exists
      element.style.position = position;
    }
  }

  // Set the value of a checkbox or radio input element
  setCheckboxValue = (id: string, value: boolean) => {
    const inputElement: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement && inputElement.type === 'checkbox') {
      // validating whether element exists and it's a checkbox input
      inputElement.checked = value;
    }
  }

  // Set the value of a select element
  setSelectValue = (id: string, value: string) => {
    const selectElement: HTMLSelectElement = document.getElementById(id) as HTMLSelectElement;
    if (selectElement) {
      // validating whether element exists
      selectElement.value = value;
    }
  }

}

export type Injection = typeof Injector;

export const Injector = new Inject();
