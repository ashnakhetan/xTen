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
}

// Replace all images in a web page with JSX element
replaceImage = (elem: JSX.Element) => {
  // Retrieve all images in the webpage
  const images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    this.render(elem, images[i]);
  });
}

// Adding a moto, chat box

// 

export type Injection = typeof Injector;

export const Injector = new Inject();