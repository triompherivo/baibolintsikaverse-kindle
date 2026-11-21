var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var _classList, _disableAutoFetchTimeout, _percent, _style, _visible, _opts, _PDFLinkService_static, isValidExplicitDest_fn, _listeners, _externalServices, _globalEventNames, _isInAutomation, _defaults, _initializedPromise, _dir, _elements, _lang, _l10n, _L10n_static, fixupLangCode_fn, isRTL_fn, _genericl10n_GenericL10n_static, generateBundles_fn, createBundle_fn, getPaths_fn, generateBundlesFallback_fn, createBundleFallback_fn, _boundCancel, _createAutomaticallyButton, _currentEditor, _cancelButton, _descriptionContainer, _dialog, _disclaimer, _downloadModel, _downloadModelDescription, _eventBus, _firstTime, _guessedAltText, _hasAI, _isEditing, _imagePreview, _imageData, _isAILoading, _wasAILoading, _learnMore, _notNowButton, _overlayManager, _textarea, _title, _uiManager, _previousAltText, _NewAltTextManager_instances, toggleLoading_fn, toggleError_fn, toggleGuessAltText_fn, toggleNotNow_fn, toggleAI_fn, toggleTitleAndDisclaimer_fn, mlGuessAltText_fn, addAltText_fn, setProgress_fn, cancel_fn, finish_fn, close_fn, extractWords_fn, save_fn, _aiModelSettings, _createModelButton, _downloadModelButton, _dialog2, _eventBus2, _mlManager, _overlayManager2, _showAltTextDialogButton, _ImageAltTextSettings_instances, reportTelemetry_fn, download_fn, delete_fn, togglePref_fn, setPref_fn, finish_fn2, _clickAC, _currentEditor2, _cancelButton2, _dialog3, _eventBus3, _hasUsedPointer, _optionDescription, _optionDecorative, _overlayManager3, _saveButton, _textarea2, _uiManager2, _previousAltText2, _resizeAC, _svgElement, _rectElement, _container, _telemetryData, _AltTextManager_instances, createSVGElement_fn, setPosition_fn, finish_fn3, close_fn2, updateUIState_fn, save_fn2, onClick_fn, removeOnClickListeners_fn, _AnnotationEditorParams_instances, bindListeners_fn, _mainContainer, _toolBarHeight, _viewerContainer, _CaretBrowsingMode_instances, isOnSameLine_fn, isUnderOver_fn, isVisible_fn, getCaretPosition_fn, _CaretBrowsingMode_static, caretPositionFromPoint_fn, setCaretPositionHelper_fn, setCaretPosition_fn, getNodeOnNextPage_fn, _openBlobUrls, _closeButton, _container2, _eventBus4, _focusTimeout, _initController, _message, _showController, _undoButton, _l10nMessages, _overlays, _active, _activeCapability, _updateCallback, _reason, _PasswordPrompt_instances, verify_fn, cancel_fn2, invokeCallback_fn, _PDFAttachmentViewer_instances, appendAttachment_fn, _activateAC, _mouseDownAC, _scrollAC, _GrabToPan_instances, onMouseDown_fn, onMouseMove_fn, endPan_fn, _active2, _prevActive, _PDFCursorTools_instances, switchTool_fn, addEventListeners_fn, _fieldData, _PDFDocumentProperties_instances, reset_fn, updateUI_fn, parseFileSize_fn, parsePageSize_fn, parseDate_fn, parseLinearization_fn, _state, _updateMatchesCountOnProgress, _visitedPagesCount, _PDFFindController_instances, onFind_fn, reset_fn2, query_get, shouldDirtyMatch_fn, isEntireWord_fn, convertToRegExpString_fn, calculateMatch_fn, extractText_fn, updatePage_fn, updateAllPages_fn, nextMatch_fn, matchesReady_fn, nextPageMatch_fn, advanceOffsetPage_fn, updateMatch_fn, onFindBarClose_fn, requestMatchesCount_fn, updateUIResultsCount_fn, updateUIState_fn2, _mainContainer2, _resizeObserver, _PDFFindBar_instances, resizeObserverCallback_fn, _eventAbortController, _PDFHistory_instances, pushOrReplaceState_fn, tryPushCurrentPosition_fn, isValidPage_fn, isValidState_fn, updateInternalState_fn, parseCurrentHash_fn, updateViewarea_fn, popState_fn, pageHide_fn, bindEvents_fn, unbindEvents_fn, _PDFLayerViewer_instances, updateLayers_fn, _state2, _args, _fullscreenChangeAbortController, _windowAbortController, _PDFPresentationMode_instances, mouseWheel_fn, notifyStateChange_fn, enter_fn, exit_fn, mouseDown_fn, contextMenu_fn, showControls_fn, hideControls_fn, resetMouseScrollState_fn, touchSwipe_fn, addWindowListeners_fn, removeWindowListeners_fn, addFullscreenChangeListeners_fn, removeFullscreenChangeListeners_fn, _closeCapability, _destroyCapability, _docProperties, _eventAbortController2, _eventBus5, _externalServices2, _pdfDocument, _pdfViewer, _ready, _scripting, _willPrintCapability, _PDFScriptingManager_instances, updateFromSandbox_fn, dispatchPageOpen_fn, dispatchPageClose_fn, initScripting_fn, destroyScripting_fn, _isRTL, _mouseAC, _outerContainerWidth, _width, _PDFSidebar_instances, dispatchEvent_fn, showUINotification_fn, hideUINotification_fn, addEventListeners_fn2, updateWidth_fn, mouseMove_fn, mouseUp_fn, _PDFThumbnailView_instances, updateDims_fn, getPageDrawContext_fn, convertCanvasToImage_fn, finishRenderTask_fn, reduceImage_fn, pageL10nArgs_get, _PDFThumbnailViewer_instances, scrollUpdated_fn, getVisibleThumbs_fn, resetView_fn, cancelRendering_fn, ensurePdfPageLoaded_fn, getScrollAhead_fn, _annotationLayer, _drawLayer, _onAppend, _structTreeLayer, _textLayer, _uiManager3, _onAppend2, _eventAbortController3, _AnnotationLayerBuilder_instances, updatePresentationModeState_fn, _drawLayer2, _promise, _treeDom, _treePromise, _elementAttributes, _rawDims, _elementsToAddToTextLayer, _StructTreeLayerBuilder_instances, setAttributes_fn, addImageInTextLayer_fn, walk_fn, _enabled, _textChildren, _textNodes, _waitingElements, _TextAccessibilityManager_static, compareElementPositions_fn, _TextAccessibilityManager_instances, addIdToAriaOwns_fn, _eventAbortController4, _enablePermissions, _onAppend3, _renderingDone, _textLayer2, _textLayers, _selectionChangeAbortController, _TextLayerBuilder_instances, bindMouse_fn, _TextLayerBuilder_static, removeGlobalSelectionListener_fn, enableGlobalSelectionListener_fn, _annotationMode, _canvasWrapper, _enableHWA, _hasRestrictedScaling, _isEditing2, _layerProperties, _loadingId, _originalViewport, _previousRotation, _scaleRoundX, _scaleRoundY, _renderError, _renderingState, _textLayerMode, _useThumbnailCanvas, _layers, _PDFPageView_instances, addLayer_fn, setDimensions_fn, dispatchLayerRendered_fn, renderAnnotationLayer_fn, renderAnnotationEditorLayer_fn, renderDrawLayer_fn, renderXfaLayer_fn, renderTextLayer_fn, renderStructTreeLayer_fn, buildXfaTextContentItems_fn, resetCanvas_fn, finishRenderTask_fn2, _buf, _size, _PDFPageViewBuffer_instances, destroyFirstView_fn, _buffer, _altTextManager, _annotationEditorHighlightColors, _annotationEditorMode, _annotationEditorUIManager, _annotationMode2, _containerTopLeft, _editorUndoBar, _enableHWA2, _enableHighlightFloatingButton, _enablePermissions2, _enableUpdatedAddImage, _enableNewAltTextWhenAddingImage, _eventAbortController5, _mlManager2, _switchAnnotationEditorModeAC, _switchAnnotationEditorModeTimeoutId, _getAllTextInProgress, _hiddenCopyElement, _interruptCopyCondition, _previousContainerHeight, _resizeObserver2, _scrollModePageState, _scaleTimeoutId, _supportsPinchToZoom, _textLayerMode2, _PDFViewer_instances, initializePermissions_fn, onePageRenderedOrForceFetch_fn, copyCallback_fn, ensurePageViewVisible_fn, scrollIntoView_fn, isSameScale_fn, setScaleUpdatePages_fn, pageWidthScaleFactor_get, setScale_fn, resetCurrentPageView_fn, switchToEditAnnotationMode_fn, ensurePdfPageLoaded_fn2, getScrollAhead_fn2, updateContainerHeightCss_fn, resizeObserverCallback_fn2, cleanupSwitchAnnotationEditorMode_fn, _opts2, _SecondaryToolbar_instances, updateUIState_fn3, bindListeners_fn2, cursorToolChanged_fn, scrollModeChanged_fn, spreadModeChanged_fn, _opts3, _Toolbar_instances, updateToolbarDensity_fn, setAnnotationEditorUIManager_fn, bindListeners_fn3, editorModeChanged_fn, updateUIState_fn4, _a;
var __webpack_require__ = {};
(() => {
  __webpack_require__.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
var __webpack_exports__ = {};
__webpack_require__.d(__webpack_exports__, {
  PDFViewerApplication: () => (
    /* reexport */
    PDFViewerApplication
  ),
  PDFViewerApplicationConstants: () => (
    /* binding */
    AppConstants
  ),
  PDFViewerApplicationOptions: () => (
    /* reexport */
    AppOptions
  )
});
;
const DEFAULT_SCALE_VALUE = "auto";
const DEFAULT_SCALE = 1;
const DEFAULT_SCALE_DELTA = 1.1;
const MIN_SCALE = 0.1;
const MAX_SCALE = 10;
const UNKNOWN_SCALE = 0;
const MAX_AUTO_SCALE = 1.25;
const SCROLLBAR_PADDING = 40;
const VERTICAL_PADDING = 5;
const RenderingStates = {
  INITIAL: 0,
  RUNNING: 1,
  PAUSED: 2,
  FINISHED: 3
};
const PresentationModeState = {
  UNKNOWN: 0,
  NORMAL: 1,
  CHANGING: 2,
  FULLSCREEN: 3
};
const SidebarView = {
  UNKNOWN: -1,
  NONE: 0,
  THUMBS: 1,
  OUTLINE: 2,
  ATTACHMENTS: 3,
  LAYERS: 4
};
const TextLayerMode = {
  DISABLE: 0,
  ENABLE: 1,
  ENABLE_PERMISSIONS: 2
};
const ScrollMode = {
  UNKNOWN: -1,
  VERTICAL: 0,
  HORIZONTAL: 1,
  WRAPPED: 2,
  PAGE: 3
};
const SpreadMode = {
  UNKNOWN: -1,
  NONE: 0,
  ODD: 1,
  EVEN: 2
};
const CursorTool = {
  SELECT: 0,
  HAND: 1,
  ZOOM: 2
};
const AutoPrintRegExp = /\bprint\s*\(/;
function scrollIntoView(element, spot, scrollMatches = false) {
  let parent2 = element.offsetParent;
  if (!parent2) {
    console.error("offsetParent is not set -- cannot scroll");
    return;
  }
  let offsetY = element.offsetTop + element.clientTop;
  let offsetX = element.offsetLeft + element.clientLeft;
  while (parent2.clientHeight === parent2.scrollHeight && parent2.clientWidth === parent2.scrollWidth || scrollMatches && (parent2.classList.contains("markedContent") || getComputedStyle(parent2).overflow === "hidden")) {
    offsetY += parent2.offsetTop;
    offsetX += parent2.offsetLeft;
    parent2 = parent2.offsetParent;
    if (!parent2) {
      return;
    }
  }
  if (spot) {
    if (spot.top !== void 0) {
      offsetY += spot.top;
    }
    if (spot.left !== void 0) {
      offsetX += spot.left;
      parent2.scrollLeft = offsetX;
    }
  }
  parent2.scrollTop = offsetY;
}
function watchScroll(viewAreaElement, callback, abortSignal = void 0) {
  const debounceScroll = function(evt) {
    if (rAF) {
      return;
    }
    rAF = window.requestAnimationFrame(function viewAreaElementScrolled() {
      rAF = null;
      const currentX = viewAreaElement.scrollLeft;
      const lastX = state.lastX;
      if (currentX !== lastX) {
        state.right = currentX > lastX;
      }
      state.lastX = currentX;
      const currentY = viewAreaElement.scrollTop;
      const lastY = state.lastY;
      if (currentY !== lastY) {
        state.down = currentY > lastY;
      }
      state.lastY = currentY;
      callback(state);
    });
  };
  const state = {
    right: true,
    down: true,
    lastX: viewAreaElement.scrollLeft,
    lastY: viewAreaElement.scrollTop,
    _eventHandler: debounceScroll
  };
  let rAF = null;
  viewAreaElement.addEventListener("scroll", debounceScroll, {
    useCapture: true,
    signal: abortSignal
  });
  abortSignal == null ? void 0 : abortSignal.addEventListener("abort", () => window.cancelAnimationFrame(rAF), {
    once: true
  });
  return state;
}
function parseQueryString(query) {
  const params = /* @__PURE__ */ new Map();
  for (const [key, value] of new URLSearchParams(query)) {
    params.set(key.toLowerCase(), value);
  }
  return params;
}
const InvisibleCharsRegExp = /[\x00-\x1F]/g;
function removeNullCharacters(str, replaceInvisible = false) {
  if (!InvisibleCharsRegExp.test(str)) {
    return str;
  }
  if (replaceInvisible) {
    return str.replaceAll(InvisibleCharsRegExp, (m) => m === "\0" ? "" : " ");
  }
  return str.replaceAll("\0", "");
}
function binarySearchFirstItem(items, condition, start = 0) {
  let minIndex = start;
  let maxIndex = items.length - 1;
  if (maxIndex < 0 || !condition(items[maxIndex])) {
    return items.length;
  }
  if (condition(items[minIndex])) {
    return minIndex;
  }
  while (minIndex < maxIndex) {
    const currentIndex = minIndex + maxIndex >> 1;
    const currentItem = items[currentIndex];
    if (condition(currentItem)) {
      maxIndex = currentIndex;
    } else {
      minIndex = currentIndex + 1;
    }
  }
  return minIndex;
}
function approximateFraction(x) {
  if (Math.floor(x) === x) {
    return [x, 1];
  }
  const xinv = 1 / x;
  const limit = 8;
  if (xinv > limit) {
    return [1, limit];
  } else if (Math.floor(xinv) === xinv) {
    return [1, xinv];
  }
  const x_ = x > 1 ? xinv : x;
  let a = 0, b = 1, c = 1, d = 1;
  while (true) {
    const p = a + c, q = b + d;
    if (q > limit) {
      break;
    }
    if (x_ <= p / q) {
      c = p;
      d = q;
    } else {
      a = p;
      b = q;
    }
  }
  let result;
  if (x_ - a / b < c / d - x_) {
    result = x_ === x ? [a, b] : [b, a];
  } else {
    result = x_ === x ? [c, d] : [d, c];
  }
  return result;
}
function floorToDivide(x, div) {
  return x - x % div;
}
function getPageSizeInches({
  view,
  userUnit,
  rotate
}) {
  const [x1, y1, x2, y2] = view;
  const changeOrientation = rotate % 180 !== 0;
  const width = (x2 - x1) / 72 * userUnit;
  const height = (y2 - y1) / 72 * userUnit;
  return {
    width: changeOrientation ? height : width,
    height: changeOrientation ? width : height
  };
}
function backtrackBeforeAllVisibleElements(index, views, top) {
  if (index < 2) {
    return index;
  }
  let elt = views[index].div;
  let pageTop = elt.offsetTop + elt.clientTop;
  if (pageTop >= top) {
    elt = views[index - 1].div;
    pageTop = elt.offsetTop + elt.clientTop;
  }
  for (let i = index - 2; i >= 0; --i) {
    elt = views[i].div;
    if (elt.offsetTop + elt.clientTop + elt.clientHeight <= pageTop) {
      break;
    }
    index = i;
  }
  return index;
}
function getVisibleElements({
  scrollEl,
  views,
  sortByVisibility = false,
  horizontal = false,
  rtl = false
}) {
  const top = scrollEl.scrollTop, bottom = top + scrollEl.clientHeight;
  const left = scrollEl.scrollLeft, right = left + scrollEl.clientWidth;
  function isElementBottomAfterViewTop(view) {
    const element = view.div;
    const elementBottom = element.offsetTop + element.clientTop + element.clientHeight;
    return elementBottom > top;
  }
  function isElementNextAfterViewHorizontally(view) {
    const element = view.div;
    const elementLeft = element.offsetLeft + element.clientLeft;
    const elementRight = elementLeft + element.clientWidth;
    return rtl ? elementLeft < right : elementRight > left;
  }
  const visible = [], ids = /* @__PURE__ */ new Set(), numViews = views.length;
  let firstVisibleElementInd = binarySearchFirstItem(views, horizontal ? isElementNextAfterViewHorizontally : isElementBottomAfterViewTop);
  if (firstVisibleElementInd > 0 && firstVisibleElementInd < numViews && !horizontal) {
    firstVisibleElementInd = backtrackBeforeAllVisibleElements(firstVisibleElementInd, views, top);
  }
  let lastEdge = horizontal ? right : -1;
  for (let i = firstVisibleElementInd; i < numViews; i++) {
    const view = views[i], element = view.div;
    const currentWidth = element.offsetLeft + element.clientLeft;
    const currentHeight = element.offsetTop + element.clientTop;
    const viewWidth = element.clientWidth, viewHeight = element.clientHeight;
    const viewRight = currentWidth + viewWidth;
    const viewBottom = currentHeight + viewHeight;
    if (lastEdge === -1) {
      if (viewBottom >= bottom) {
        lastEdge = viewBottom;
      }
    } else if ((horizontal ? currentWidth : currentHeight) > lastEdge) {
      break;
    }
    if (viewBottom <= top || currentHeight >= bottom || viewRight <= left || currentWidth >= right) {
      continue;
    }
    const hiddenHeight = Math.max(0, top - currentHeight) + Math.max(0, viewBottom - bottom);
    const hiddenWidth = Math.max(0, left - currentWidth) + Math.max(0, viewRight - right);
    const fractionHeight = (viewHeight - hiddenHeight) / viewHeight, fractionWidth = (viewWidth - hiddenWidth) / viewWidth;
    const percent = fractionHeight * fractionWidth * 100 | 0;
    visible.push({
      id: view.id,
      x: currentWidth,
      y: currentHeight,
      view,
      percent,
      widthPercent: fractionWidth * 100 | 0
    });
    ids.add(view.id);
  }
  const first = visible[0], last = visible.at(-1);
  if (sortByVisibility) {
    visible.sort(function(a, b) {
      const pc = a.percent - b.percent;
      if (Math.abs(pc) > 1e-3) {
        return -pc;
      }
      return a.id - b.id;
    });
  }
  return {
    first,
    last,
    views: visible,
    ids
  };
}
function normalizeWheelEventDirection(evt) {
  let delta = Math.hypot(evt.deltaX, evt.deltaY);
  const angle = Math.atan2(evt.deltaY, evt.deltaX);
  if (-0.25 * Math.PI < angle && angle < 0.75 * Math.PI) {
    delta = -delta;
  }
  return delta;
}
function normalizeWheelEventDelta(evt) {
  const deltaMode = evt.deltaMode;
  let delta = normalizeWheelEventDirection(evt);
  const MOUSE_PIXELS_PER_LINE = 30;
  const MOUSE_LINES_PER_PAGE = 30;
  if (deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
    delta /= MOUSE_PIXELS_PER_LINE * MOUSE_LINES_PER_PAGE;
  } else if (deltaMode === WheelEvent.DOM_DELTA_LINE) {
    delta /= MOUSE_LINES_PER_PAGE;
  }
  return delta;
}
function isValidRotation(angle) {
  return Number.isInteger(angle) && angle % 90 === 0;
}
function isValidScrollMode(mode) {
  return Number.isInteger(mode) && Object.values(ScrollMode).includes(mode) && mode !== ScrollMode.UNKNOWN;
}
function isValidSpreadMode(mode) {
  return Number.isInteger(mode) && Object.values(SpreadMode).includes(mode) && mode !== SpreadMode.UNKNOWN;
}
function isPortraitOrientation(size) {
  return size.width <= size.height;
}
const animationStarted = new Promise(function(resolve) {
  window.requestAnimationFrame(resolve);
});
const docStyle = document.documentElement.style;
function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}
class ProgressBar {
  constructor(bar) {
    __privateAdd(this, _classList, null);
    __privateAdd(this, _disableAutoFetchTimeout, null);
    __privateAdd(this, _percent, 0);
    __privateAdd(this, _style, null);
    __privateAdd(this, _visible, true);
    __privateSet(this, _classList, bar.classList);
    __privateSet(this, _style, bar.style);
  }
  get percent() {
    return __privateGet(this, _percent);
  }
  set percent(val) {
    __privateSet(this, _percent, clamp(val, 0, 100));
    if (isNaN(val)) {
      __privateGet(this, _classList).add("indeterminate");
      return;
    }
    __privateGet(this, _classList).remove("indeterminate");
    __privateGet(this, _style).setProperty("--progressBar-percent", `${__privateGet(this, _percent)}%`);
  }
  setWidth(viewer) {
    if (!viewer) {
      return;
    }
    const container = viewer.parentNode;
    const scrollbarWidth = container.offsetWidth - viewer.offsetWidth;
    if (scrollbarWidth > 0) {
      __privateGet(this, _style).setProperty("--progressBar-end-offset", `${scrollbarWidth}px`);
    }
  }
  setDisableAutoFetch(delay = 5e3) {
    if (__privateGet(this, _percent) === 100 || isNaN(__privateGet(this, _percent))) {
      return;
    }
    if (__privateGet(this, _disableAutoFetchTimeout)) {
      clearTimeout(__privateGet(this, _disableAutoFetchTimeout));
    }
    this.show();
    __privateSet(this, _disableAutoFetchTimeout, setTimeout(() => {
      __privateSet(this, _disableAutoFetchTimeout, null);
      this.hide();
    }, delay));
  }
  hide() {
    if (!__privateGet(this, _visible)) {
      return;
    }
    __privateSet(this, _visible, false);
    __privateGet(this, _classList).add("hidden");
  }
  show() {
    if (__privateGet(this, _visible)) {
      return;
    }
    __privateSet(this, _visible, true);
    __privateGet(this, _classList).remove("hidden");
  }
}
_classList = new WeakMap();
_disableAutoFetchTimeout = new WeakMap();
_percent = new WeakMap();
_style = new WeakMap();
_visible = new WeakMap();
function getActiveOrFocusedElement() {
  let curRoot = document;
  let curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(":focus");
  while (curActiveOrFocused == null ? void 0 : curActiveOrFocused.shadowRoot) {
    curRoot = curActiveOrFocused.shadowRoot;
    curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(":focus");
  }
  return curActiveOrFocused;
}
function apiPageLayoutToViewerModes(layout) {
  let scrollMode = ScrollMode.VERTICAL, spreadMode = SpreadMode.NONE;
  switch (layout) {
    case "SinglePage":
      scrollMode = ScrollMode.PAGE;
      break;
    case "OneColumn":
      break;
    case "TwoPageLeft":
      scrollMode = ScrollMode.PAGE;
    case "TwoColumnLeft":
      spreadMode = SpreadMode.ODD;
      break;
    case "TwoPageRight":
      scrollMode = ScrollMode.PAGE;
    case "TwoColumnRight":
      spreadMode = SpreadMode.EVEN;
      break;
  }
  return {
    scrollMode,
    spreadMode
  };
}
function apiPageModeToSidebarView(mode) {
  switch (mode) {
    case "UseNone":
      return SidebarView.NONE;
    case "UseThumbs":
      return SidebarView.THUMBS;
    case "UseOutlines":
      return SidebarView.OUTLINE;
    case "UseAttachments":
      return SidebarView.ATTACHMENTS;
    case "UseOC":
      return SidebarView.LAYERS;
  }
  return SidebarView.NONE;
}
function toggleCheckedBtn(button, toggle, view = null) {
  button.classList.toggle("toggled", toggle);
  button.setAttribute("aria-checked", toggle);
  view == null ? void 0 : view.classList.toggle("hidden", !toggle);
}
function toggleExpandedBtn(button, toggle, view = null) {
  button.classList.toggle("toggled", toggle);
  button.setAttribute("aria-expanded", toggle);
  view == null ? void 0 : view.classList.toggle("hidden", !toggle);
}
const calcRound = (function() {
  const e = document.createElement("div");
  e.style.width = "round(down, calc(1.6666666666666665 * 792px), 1px)";
  return e.style.width === "calc(1320px)" ? Math.fround : (x) => x;
})();
;
{
  var compatParams = /* @__PURE__ */ new Map();
  const userAgent = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const maxTouchPoints = navigator.maxTouchPoints || 1;
  const isAndroid = /Android/.test(userAgent);
  const isIOS = /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent) || platform === "MacIntel" && maxTouchPoints > 1;
  (function() {
    if (isIOS || isAndroid) {
      compatParams.set("maxCanvasPixels", 5242880);
    }
  })();
  (function() {
    if (isAndroid) {
      compatParams.set("useSystemFonts", false);
    }
  })();
}
const OptionKind = {
  BROWSER: 1,
  VIEWER: 2,
  API: 4,
  WORKER: 8,
  EVENT_DISPATCH: 16,
  PREFERENCE: 128
};
const Type = {
  BOOLEAN: 1,
  NUMBER: 2,
  OBJECT: 4,
  STRING: 8,
  UNDEFINED: 16
};
const defaultOptions = {
  allowedGlobalEvents: {
    value: null,
    kind: OptionKind.BROWSER
  },
  canvasMaxAreaInBytes: {
    value: -1,
    kind: OptionKind.BROWSER + OptionKind.API
  },
  isInAutomation: {
    value: false,
    kind: OptionKind.BROWSER
  },
  localeProperties: {
    value: {
      lang: navigator.language || "en-US"
    },
    kind: OptionKind.BROWSER
  },
  nimbusDataStr: {
    value: "",
    kind: OptionKind.BROWSER
  },
  supportsCaretBrowsingMode: {
    value: false,
    kind: OptionKind.BROWSER
  },
  supportsDocumentFonts: {
    value: true,
    kind: OptionKind.BROWSER
  },
  supportsIntegratedFind: {
    value: false,
    kind: OptionKind.BROWSER
  },
  supportsMouseWheelZoomCtrlKey: {
    value: true,
    kind: OptionKind.BROWSER
  },
  supportsMouseWheelZoomMetaKey: {
    value: true,
    kind: OptionKind.BROWSER
  },
  supportsPinchToZoom: {
    value: true,
    kind: OptionKind.BROWSER
  },
  toolbarDensity: {
    value: 0,
    kind: OptionKind.BROWSER + OptionKind.EVENT_DISPATCH
  },
  altTextLearnMoreUrl: {
    value: "",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  annotationEditorMode: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  annotationMode: {
    value: 2,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  cursorToolOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  debuggerSrc: {
    value: "./debugger.mjs",
    kind: OptionKind.VIEWER
  },
  defaultZoomDelay: {
    value: 400,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  defaultZoomValue: {
    value: "",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  disableHistory: {
    value: false,
    kind: OptionKind.VIEWER
  },
  disablePageLabels: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableAltText: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableAltTextModelDownload: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE + OptionKind.EVENT_DISPATCH
  },
  enableGuessAltText: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE + OptionKind.EVENT_DISPATCH
  },
  enableHighlightFloatingButton: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableNewAltTextWhenAddingImage: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enablePermissions: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enablePrintAutoRotate: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableScripting: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableUpdatedAddImage: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  externalLinkRel: {
    value: "noopener noreferrer nofollow",
    kind: OptionKind.VIEWER
  },
  externalLinkTarget: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  highlightEditorColors: {
    value: "yellow=#FFFF98,green=#53FFBC,blue=#80EBFF,pink=#FFCBE6,red=#FF4F5F",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  historyUpdateUrl: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  ignoreDestinationZoom: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  imageResourcesPath: {
    value: "./images/",
    kind: OptionKind.VIEWER
  },
  maxCanvasPixels: {
    value: 2 ** 25,
    kind: OptionKind.VIEWER
  },
  forcePageColors: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  pageColorsBackground: {
    value: "Canvas",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  pageColorsForeground: {
    value: "CanvasText",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  pdfBugEnabled: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  printResolution: {
    value: 150,
    kind: OptionKind.VIEWER
  },
  sidebarViewOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  scrollModeOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  spreadModeOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  textLayerMode: {
    value: 1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  viewOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  cMapPacked: {
    value: true,
    kind: OptionKind.API
  },
  cMapUrl: {
    value: "../web/cmaps/",
    kind: OptionKind.API
  },
  disableAutoFetch: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableFontFace: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableRange: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableStream: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  docBaseUrl: {
    value: "",
    kind: OptionKind.API
  },
  enableHWA: {
    value: true,
    kind: OptionKind.API + OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableXfa: {
    value: true,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  fontExtraProperties: {
    value: false,
    kind: OptionKind.API
  },
  isEvalSupported: {
    value: true,
    kind: OptionKind.API
  },
  isOffscreenCanvasSupported: {
    value: true,
    kind: OptionKind.API
  },
  maxImageSize: {
    value: -1,
    kind: OptionKind.API
  },
  pdfBug: {
    value: false,
    kind: OptionKind.API
  },
  standardFontDataUrl: {
    value: "../web/standard_fonts/",
    kind: OptionKind.API
  },
  useSystemFonts: {
    value: void 0,
    kind: OptionKind.API,
    type: Type.BOOLEAN + Type.UNDEFINED
  },
  verbosity: {
    value: 1,
    kind: OptionKind.API
  },
  workerPort: {
    value: null,
    kind: OptionKind.WORKER
  },
  workerSrc: {
    value: "../build/pdf.worker.mjs",
    kind: OptionKind.WORKER
  }
};
{
  defaultOptions.defaultUrl = {
    value: "compressed.tracemonkey-pldi-09.pdf",
    kind: OptionKind.VIEWER
  };
  defaultOptions.sandboxBundleSrc = {
    value: "../build/pdf.sandbox.mjs",
    kind: OptionKind.VIEWER
  };
  defaultOptions.viewerCssTheme = {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  };
  defaultOptions.enableFakeMLManager = {
    value: true,
    kind: OptionKind.VIEWER
  };
}
{
  defaultOptions.disablePreferences = {
    value: false,
    kind: OptionKind.VIEWER
  };
}
const _AppOptions = class _AppOptions {
  static get(name) {
    return __privateGet(this, _opts).get(name);
  }
  static getAll(kind = null, defaultOnly = false) {
    const options = /* @__PURE__ */ Object.create(null);
    for (const name in defaultOptions) {
      const defaultOpt = defaultOptions[name];
      if (kind && !(kind & defaultOpt.kind)) {
        continue;
      }
      options[name] = !defaultOnly ? __privateGet(this, _opts).get(name) : defaultOpt.value;
    }
    return options;
  }
  static set(name, value) {
    this.setAll({
      [name]: value
    });
  }
  static setAll(options, prefs = false) {
    this._hasInvokedSet || (this._hasInvokedSet = true);
    let events;
    for (const name in options) {
      const defaultOpt = defaultOptions[name], userOpt = options[name];
      if (!defaultOpt || !(typeof userOpt === typeof defaultOpt.value || Type[(typeof userOpt).toUpperCase()] & defaultOpt.type)) {
        continue;
      }
      const {
        kind
      } = defaultOpt;
      if (prefs && !(kind & OptionKind.BROWSER || kind & OptionKind.PREFERENCE)) {
        continue;
      }
      if (this.eventBus && kind & OptionKind.EVENT_DISPATCH) {
        (events || (events = /* @__PURE__ */ new Map())).set(name, userOpt);
      }
      __privateGet(this, _opts).set(name, userOpt);
    }
    if (events) {
      for (const [name, value] of events) {
        this.eventBus.dispatch(name.toLowerCase(), {
          source: this,
          value
        });
      }
    }
  }
};
_opts = new WeakMap();
__publicField(_AppOptions, "eventBus");
__privateAdd(_AppOptions, _opts, /* @__PURE__ */ new Map());
(() => {
  for (const name in defaultOptions) {
    __privateGet(_AppOptions, _opts).set(name, defaultOptions[name].value);
  }
  for (const [name, value] of compatParams) {
    __privateGet(_AppOptions, _opts).set(name, value);
  }
  _AppOptions._hasInvokedSet = false;
  _AppOptions._checkDisablePreferences = () => {
    if (_AppOptions.get("disablePreferences")) {
      return true;
    }
    if (_AppOptions._hasInvokedSet) {
      console.warn('The Preferences may override manually set AppOptions; please use the "disablePreferences"-option to prevent that.');
    }
    return false;
  };
})();
let AppOptions = _AppOptions;
;
const DEFAULT_LINK_REL = "noopener noreferrer nofollow";
const LinkTarget = {
  NONE: 0,
  SELF: 1,
  BLANK: 2,
  PARENT: 3,
  TOP: 4
};
const _PDFLinkService = class _PDFLinkService {
  externalLinkEnabled = true;
  constructor({
    eventBus,
    externalLinkTarget = null,
    externalLinkRel = null,
    ignoreDestinationZoom = false
  } = {}) {
    this.eventBus = eventBus;
    this.externalLinkTarget = externalLinkTarget;
    this.externalLinkRel = externalLinkRel;
    this._ignoreDestinationZoom = ignoreDestinationZoom;
    this.baseUrl = null;
    this.pdfDocument = null;
    this.pdfViewer = null;
    this.pdfHistory = null;
  }
  setDocument(pdfDocument, baseUrl = null) {
    this.baseUrl = baseUrl;
    this.pdfDocument = pdfDocument;
  }
  setViewer(pdfViewer) {
    this.pdfViewer = pdfViewer;
  }
  setHistory(pdfHistory) {
    this.pdfHistory = pdfHistory;
  }
  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  }
  get page() {
    return this.pdfDocument ? this.pdfViewer.currentPageNumber : 1;
  }
  set page(value) {
    if (this.pdfDocument) {
      this.pdfViewer.currentPageNumber = value;
    }
  }
  get rotation() {
    return this.pdfDocument ? this.pdfViewer.pagesRotation : 0;
  }
  set rotation(value) {
    if (this.pdfDocument) {
      this.pdfViewer.pagesRotation = value;
    }
  }
  get isInPresentationMode() {
    return this.pdfDocument ? this.pdfViewer.isInPresentationMode : false;
  }
  async goToDestination(dest) {
    if (!this.pdfDocument) {
      return;
    }
    let namedDest, explicitDest, pageNumber;
    if (typeof dest === "string") {
      namedDest = dest;
      explicitDest = await this.pdfDocument.getDestination(dest);
    } else {
      namedDest = null;
      explicitDest = await dest;
    }
    if (!Array.isArray(explicitDest)) {
      console.error(`goToDestination: "${explicitDest}" is not a valid destination array, for dest="${dest}".`);
      return;
    }
    const [destRef] = explicitDest;
    if (destRef && typeof destRef === "object") {
      pageNumber = this.pdfDocument.cachedPageNumber(destRef);
      if (!pageNumber) {
        try {
          pageNumber = await this.pdfDocument.getPageIndex(destRef) + 1;
        } catch {
          console.error(`goToDestination: "${destRef}" is not a valid page reference, for dest="${dest}".`);
          return;
        }
      }
    } else if (Number.isInteger(destRef)) {
      pageNumber = destRef + 1;
    }
    if (!pageNumber || pageNumber < 1 || pageNumber > this.pagesCount) {
      console.error(`goToDestination: "${pageNumber}" is not a valid page number, for dest="${dest}".`);
      return;
    }
    if (this.pdfHistory) {
      this.pdfHistory.pushCurrentPosition();
      this.pdfHistory.push({
        namedDest,
        explicitDest,
        pageNumber
      });
    }
    this.pdfViewer.scrollPageIntoView({
      pageNumber,
      destArray: explicitDest,
      ignoreDestinationZoom: this._ignoreDestinationZoom
    });
  }
  goToPage(val) {
    if (!this.pdfDocument) {
      return;
    }
    const pageNumber = typeof val === "string" && this.pdfViewer.pageLabelToPageNumber(val) || val | 0;
    if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
      console.error(`PDFLinkService.goToPage: "${val}" is not a valid page.`);
      return;
    }
    if (this.pdfHistory) {
      this.pdfHistory.pushCurrentPosition();
      this.pdfHistory.pushPage(pageNumber);
    }
    this.pdfViewer.scrollPageIntoView({
      pageNumber
    });
  }
  addLinkAttributes(link, url, newWindow = false) {
    if (!url || typeof url !== "string") {
      throw new Error('A valid "url" parameter must provided.');
    }
    const target = newWindow ? LinkTarget.BLANK : this.externalLinkTarget, rel = this.externalLinkRel;
    if (this.externalLinkEnabled) {
      link.href = link.title = url;
    } else {
      link.href = "";
      link.title = `Disabled: ${url}`;
      link.onclick = () => false;
    }
    let targetStr = "";
    switch (target) {
      case LinkTarget.NONE:
        break;
      case LinkTarget.SELF:
        targetStr = "_self";
        break;
      case LinkTarget.BLANK:
        targetStr = "_blank";
        break;
      case LinkTarget.PARENT:
        targetStr = "_parent";
        break;
      case LinkTarget.TOP:
        targetStr = "_top";
        break;
    }
    link.target = targetStr;
    link.rel = typeof rel === "string" ? rel : DEFAULT_LINK_REL;
  }
  getDestinationHash(dest) {
    if (typeof dest === "string") {
      if (dest.length > 0) {
        return this.getAnchorUrl("#" + escape(dest));
      }
    } else if (Array.isArray(dest)) {
      const str = JSON.stringify(dest);
      if (str.length > 0) {
        return this.getAnchorUrl("#" + escape(str));
      }
    }
    return this.getAnchorUrl("");
  }
  getAnchorUrl(anchor) {
    return this.baseUrl ? this.baseUrl + anchor : anchor;
  }
  setHash(hash) {
    var _a2;
    if (!this.pdfDocument) {
      return;
    }
    let pageNumber, dest;
    if (hash.includes("=")) {
      const params = parseQueryString(hash);
      if (params.has("search")) {
        const query = params.get("search").replaceAll('"', ""), phrase = params.get("phrase") === "true";
        this.eventBus.dispatch("findfromurlhash", {
          source: this,
          query: phrase ? query : query.match(/\S+/g)
        });
      }
      if (params.has("page")) {
        pageNumber = params.get("page") | 0 || 1;
      }
      if (params.has("zoom")) {
        const zoomArgs = params.get("zoom").split(",");
        const zoomArg = zoomArgs[0];
        const zoomArgNumber = parseFloat(zoomArg);
        if (!zoomArg.includes("Fit")) {
          dest = [null, {
            name: "XYZ"
          }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null, zoomArgs.length > 2 ? zoomArgs[2] | 0 : null, zoomArgNumber ? zoomArgNumber / 100 : zoomArg];
        } else if (zoomArg === "Fit" || zoomArg === "FitB") {
          dest = [null, {
            name: zoomArg
          }];
        } else if (zoomArg === "FitH" || zoomArg === "FitBH" || zoomArg === "FitV" || zoomArg === "FitBV") {
          dest = [null, {
            name: zoomArg
          }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null];
        } else if (zoomArg === "FitR") {
          if (zoomArgs.length !== 5) {
            console.error('PDFLinkService.setHash: Not enough parameters for "FitR".');
          } else {
            dest = [null, {
              name: zoomArg
            }, zoomArgs[1] | 0, zoomArgs[2] | 0, zoomArgs[3] | 0, zoomArgs[4] | 0];
          }
        } else {
          console.error(`PDFLinkService.setHash: "${zoomArg}" is not a valid zoom value.`);
        }
      }
      if (dest) {
        this.pdfViewer.scrollPageIntoView({
          pageNumber: pageNumber || this.page,
          destArray: dest,
          allowNegativeOffset: true
        });
      } else if (pageNumber) {
        this.page = pageNumber;
      }
      if (params.has("pagemode")) {
        this.eventBus.dispatch("pagemode", {
          source: this,
          mode: params.get("pagemode")
        });
      }
      if (params.has("nameddest")) {
        this.goToDestination(params.get("nameddest"));
      }
      return;
    }
    dest = unescape(hash);
    try {
      dest = JSON.parse(dest);
      if (!Array.isArray(dest)) {
        dest = dest.toString();
      }
    } catch {
    }
    if (typeof dest === "string" || __privateMethod(_a2 = _PDFLinkService, _PDFLinkService_static, isValidExplicitDest_fn).call(_a2, dest)) {
      this.goToDestination(dest);
      return;
    }
    console.error(`PDFLinkService.setHash: "${unescape(hash)}" is not a valid destination.`);
  }
  executeNamedAction(action) {
    var _a2, _b;
    if (!this.pdfDocument) {
      return;
    }
    switch (action) {
      case "GoBack":
        (_a2 = this.pdfHistory) == null ? void 0 : _a2.back();
        break;
      case "GoForward":
        (_b = this.pdfHistory) == null ? void 0 : _b.forward();
        break;
      case "NextPage":
        this.pdfViewer.nextPage();
        break;
      case "PrevPage":
        this.pdfViewer.previousPage();
        break;
      case "LastPage":
        this.page = this.pagesCount;
        break;
      case "FirstPage":
        this.page = 1;
        break;
      default:
        break;
    }
    this.eventBus.dispatch("namedaction", {
      source: this,
      action
    });
  }
  async executeSetOCGState(action) {
    if (!this.pdfDocument) {
      return;
    }
    const pdfDocument = this.pdfDocument, optionalContentConfig = await this.pdfViewer.optionalContentConfigPromise;
    if (pdfDocument !== this.pdfDocument) {
      return;
    }
    optionalContentConfig.setOCGState(action);
    this.pdfViewer.optionalContentConfigPromise = Promise.resolve(optionalContentConfig);
  }
};
_PDFLinkService_static = new WeakSet();
isValidExplicitDest_fn = function(dest) {
  if (!Array.isArray(dest) || dest.length < 2) {
    return false;
  }
  const [page, zoom, ...args] = dest;
  if (!(typeof page === "object" && Number.isInteger(page == null ? void 0 : page.num) && Number.isInteger(page == null ? void 0 : page.gen)) && !Number.isInteger(page)) {
    return false;
  }
  if (!(typeof zoom === "object" && typeof (zoom == null ? void 0 : zoom.name) === "string")) {
    return false;
  }
  const argsLen = args.length;
  let allowNull = true;
  switch (zoom.name) {
    case "XYZ":
      if (argsLen < 2 || argsLen > 3) {
        return false;
      }
      break;
    case "Fit":
    case "FitB":
      return argsLen === 0;
    case "FitH":
    case "FitBH":
    case "FitV":
    case "FitBV":
      if (argsLen > 1) {
        return false;
      }
      break;
    case "FitR":
      if (argsLen !== 4) {
        return false;
      }
      allowNull = false;
      break;
    default:
      return false;
  }
  for (const arg of args) {
    if (!(typeof arg === "number" || allowNull && arg === null)) {
      return false;
    }
  }
  return true;
};
__privateAdd(_PDFLinkService, _PDFLinkService_static);
let PDFLinkService = _PDFLinkService;
class SimpleLinkService extends PDFLinkService {
  setDocument(pdfDocument, baseUrl = null) {
  }
}
;
const {
  AbortException,
  AnnotationEditorLayer,
  AnnotationEditorParamsType,
  AnnotationEditorType,
  AnnotationEditorUIManager,
  AnnotationLayer,
  AnnotationMode,
  build,
  ColorPicker,
  createValidAbsoluteUrl,
  DOMSVGFactory,
  DrawLayer,
  FeatureTest,
  fetchData,
  getDocument,
  getFilenameFromUrl,
  getPdfFilenameFromUrl: pdfjs_getPdfFilenameFromUrl,
  getXfaPageViewport,
  GlobalWorkerOptions,
  ImageKind,
  InvalidPDFException,
  isDataScheme,
  isPdfFile,
  MissingPDFException,
  noContextMenu,
  normalizeUnicode,
  OPS,
  OutputScale,
  PasswordResponses,
  PDFDataRangeTransport,
  PDFDateString,
  PDFWorker,
  PermissionFlag,
  PixelsPerInch,
  RenderingCancelledException,
  setLayerDimensions,
  shadow,
  stopEvent,
  TextLayer,
  TouchManager,
  UnexpectedResponseException,
  Util,
  VerbosityLevel,
  version,
  XfaLayer
} = globalThis.pdfjsLib;
;
const WaitOnType = {
  EVENT: "event",
  TIMEOUT: "timeout"
};
async function waitOnEventOrTimeout({
  target,
  name,
  delay = 0
}) {
  if (typeof target !== "object" || !(name && typeof name === "string") || !(Number.isInteger(delay) && delay >= 0)) {
    throw new Error("waitOnEventOrTimeout - invalid parameters.");
  }
  const {
    promise,
    resolve
  } = Promise.withResolvers();
  const ac = new AbortController();
  function handler(type) {
    ac.abort();
    clearTimeout(timeout);
    resolve(type);
  }
  const evtMethod = target instanceof EventBus ? "_on" : "addEventListener";
  target[evtMethod](name, handler.bind(null, WaitOnType.EVENT), {
    signal: ac.signal
  });
  const timeout = setTimeout(handler.bind(null, WaitOnType.TIMEOUT), delay);
  return promise;
}
class EventBus {
  constructor() {
    __privateAdd(this, _listeners, /* @__PURE__ */ Object.create(null));
  }
  on(eventName, listener, options = null) {
    this._on(eventName, listener, {
      external: true,
      once: options == null ? void 0 : options.once,
      signal: options == null ? void 0 : options.signal
    });
  }
  off(eventName, listener, options = null) {
    this._off(eventName, listener);
  }
  dispatch(eventName, data) {
    const eventListeners = __privateGet(this, _listeners)[eventName];
    if (!eventListeners || eventListeners.length === 0) {
      return;
    }
    let externalListeners;
    for (const {
      listener,
      external,
      once
    } of eventListeners.slice(0)) {
      if (once) {
        this._off(eventName, listener);
      }
      if (external) {
        (externalListeners || (externalListeners = [])).push(listener);
        continue;
      }
      listener(data);
    }
    if (externalListeners) {
      for (const listener of externalListeners) {
        listener(data);
      }
      externalListeners = null;
    }
  }
  _on(eventName, listener, options = null) {
    var _a2;
    let rmAbort = null;
    if ((options == null ? void 0 : options.signal) instanceof AbortSignal) {
      const {
        signal
      } = options;
      if (signal.aborted) {
        console.error("Cannot use an `aborted` signal.");
        return;
      }
      const onAbort = () => this._off(eventName, listener);
      rmAbort = () => signal.removeEventListener("abort", onAbort);
      signal.addEventListener("abort", onAbort);
    }
    const eventListeners = (_a2 = __privateGet(this, _listeners))[eventName] || (_a2[eventName] = []);
    eventListeners.push({
      listener,
      external: (options == null ? void 0 : options.external) === true,
      once: (options == null ? void 0 : options.once) === true,
      rmAbort
    });
  }
  _off(eventName, listener, options = null) {
    var _a2;
    const eventListeners = __privateGet(this, _listeners)[eventName];
    if (!eventListeners) {
      return;
    }
    for (let i = 0, ii = eventListeners.length; i < ii; i++) {
      const evt = eventListeners[i];
      if (evt.listener === listener) {
        (_a2 = evt.rmAbort) == null ? void 0 : _a2.call(evt);
        eventListeners.splice(i, 1);
        return;
      }
    }
  }
}
_listeners = new WeakMap();
class FirefoxEventBus extends EventBus {
  constructor(globalEventNames, externalServices, isInAutomation) {
    super();
    __privateAdd(this, _externalServices);
    __privateAdd(this, _globalEventNames);
    __privateAdd(this, _isInAutomation);
    __privateSet(this, _globalEventNames, globalEventNames);
    __privateSet(this, _externalServices, externalServices);
    __privateSet(this, _isInAutomation, isInAutomation);
  }
  dispatch(eventName, data) {
    throw new Error("Not implemented: FirefoxEventBus.dispatch");
  }
}
_externalServices = new WeakMap();
_globalEventNames = new WeakMap();
_isInAutomation = new WeakMap();
;
class BaseExternalServices {
  updateFindControlState(data) {
  }
  updateFindMatchesCount(data) {
  }
  initPassiveLoading() {
  }
  reportTelemetry(data) {
  }
  async createL10n() {
    throw new Error("Not implemented: createL10n");
  }
  createScripting() {
    throw new Error("Not implemented: createScripting");
  }
  updateEditorStates(data) {
    throw new Error("Not implemented: updateEditorStates");
  }
  dispatchGlobalEvent(_event) {
  }
}
;
class BasePreferences {
  constructor() {
    __privateAdd(this, _defaults, Object.freeze({
      altTextLearnMoreUrl: "",
      annotationEditorMode: 0,
      annotationMode: 2,
      cursorToolOnLoad: 0,
      defaultZoomDelay: 400,
      defaultZoomValue: "",
      disablePageLabels: false,
      enableAltText: false,
      enableAltTextModelDownload: true,
      enableGuessAltText: true,
      enableHighlightFloatingButton: false,
      enableNewAltTextWhenAddingImage: true,
      enablePermissions: false,
      enablePrintAutoRotate: true,
      enableScripting: true,
      enableUpdatedAddImage: false,
      externalLinkTarget: 0,
      highlightEditorColors: "yellow=#FFFF98,green=#53FFBC,blue=#80EBFF,pink=#FFCBE6,red=#FF4F5F",
      historyUpdateUrl: false,
      ignoreDestinationZoom: false,
      forcePageColors: false,
      pageColorsBackground: "Canvas",
      pageColorsForeground: "CanvasText",
      pdfBugEnabled: false,
      sidebarViewOnLoad: -1,
      scrollModeOnLoad: -1,
      spreadModeOnLoad: -1,
      textLayerMode: 1,
      viewOnLoad: 0,
      disableAutoFetch: false,
      disableFontFace: false,
      disableRange: false,
      disableStream: false,
      enableHWA: true,
      enableXfa: true,
      viewerCssTheme: 0
    }));
    __privateAdd(this, _initializedPromise, null);
    __privateSet(this, _initializedPromise, this._readFromStorage(__privateGet(this, _defaults)).then(({
      browserPrefs,
      prefs
    }) => {
      if (AppOptions._checkDisablePreferences()) {
        return;
      }
      AppOptions.setAll({
        ...browserPrefs,
        ...prefs
      }, true);
    }));
  }
  async _writeToStorage(prefObj) {
    throw new Error("Not implemented: _writeToStorage");
  }
  async _readFromStorage(prefObj) {
    throw new Error("Not implemented: _readFromStorage");
  }
  async reset() {
    await __privateGet(this, _initializedPromise);
    AppOptions.setAll(__privateGet(this, _defaults), true);
    await this._writeToStorage(__privateGet(this, _defaults));
  }
  async set(name, value) {
    await __privateGet(this, _initializedPromise);
    AppOptions.setAll({
      [name]: value
    }, true);
    await this._writeToStorage(AppOptions.getAll(OptionKind.PREFERENCE));
  }
  async get(name) {
    await __privateGet(this, _initializedPromise);
    return AppOptions.get(name);
  }
  get initializedPromise() {
    return __privateGet(this, _initializedPromise);
  }
}
_defaults = new WeakMap();
_initializedPromise = new WeakMap();
;
class FluentType {
  constructor(value) {
    this.value = value;
  }
  valueOf() {
    return this.value;
  }
}
class FluentNone extends FluentType {
  constructor(value = "???") {
    super(value);
  }
  toString(scope) {
    return `{${this.value}}`;
  }
}
class FluentNumber extends FluentType {
  constructor(value, opts = {}) {
    super(value);
    this.opts = opts;
  }
  toString(scope) {
    try {
      const nf = scope.memoizeIntlObject(Intl.NumberFormat, this.opts);
      return nf.format(this.value);
    } catch (err) {
      scope.reportError(err);
      return this.value.toString(10);
    }
  }
}
class FluentDateTime extends FluentType {
  constructor(value, opts = {}) {
    super(value);
    this.opts = opts;
  }
  toString(scope) {
    try {
      const dtf = scope.memoizeIntlObject(Intl.DateTimeFormat, this.opts);
      return dtf.format(this.value);
    } catch (err) {
      scope.reportError(err);
      return new Date(this.value).toISOString();
    }
  }
}
;
const MAX_PLACEABLES = 100;
const FSI = "\u2068";
const PDI = "\u2069";
function match(scope, selector, key) {
  if (key === selector) {
    return true;
  }
  if (key instanceof FluentNumber && selector instanceof FluentNumber && key.value === selector.value) {
    return true;
  }
  if (selector instanceof FluentNumber && typeof key === "string") {
    let category = scope.memoizeIntlObject(Intl.PluralRules, selector.opts).select(selector.value);
    if (key === category) {
      return true;
    }
  }
  return false;
}
function getDefault(scope, variants, star) {
  if (variants[star]) {
    return resolvePattern(scope, variants[star].value);
  }
  scope.reportError(new RangeError("No default"));
  return new FluentNone();
}
function getArguments(scope, args) {
  const positional = [];
  const named = /* @__PURE__ */ Object.create(null);
  for (const arg of args) {
    if (arg.type === "narg") {
      named[arg.name] = resolveExpression(scope, arg.value);
    } else {
      positional.push(resolveExpression(scope, arg));
    }
  }
  return {
    positional,
    named
  };
}
function resolveExpression(scope, expr) {
  switch (expr.type) {
    case "str":
      return expr.value;
    case "num":
      return new FluentNumber(expr.value, {
        minimumFractionDigits: expr.precision
      });
    case "var":
      return resolveVariableReference(scope, expr);
    case "mesg":
      return resolveMessageReference(scope, expr);
    case "term":
      return resolveTermReference(scope, expr);
    case "func":
      return resolveFunctionReference(scope, expr);
    case "select":
      return resolveSelectExpression(scope, expr);
    default:
      return new FluentNone();
  }
}
function resolveVariableReference(scope, {
  name
}) {
  let arg;
  if (scope.params) {
    if (Object.prototype.hasOwnProperty.call(scope.params, name)) {
      arg = scope.params[name];
    } else {
      return new FluentNone(`$${name}`);
    }
  } else if (scope.args && Object.prototype.hasOwnProperty.call(scope.args, name)) {
    arg = scope.args[name];
  } else {
    scope.reportError(new ReferenceError(`Unknown variable: $${name}`));
    return new FluentNone(`$${name}`);
  }
  if (arg instanceof FluentType) {
    return arg;
  }
  switch (typeof arg) {
    case "string":
      return arg;
    case "number":
      return new FluentNumber(arg);
    case "object":
      if (arg instanceof Date) {
        return new FluentDateTime(arg.getTime());
      }
    default:
      scope.reportError(new TypeError(`Variable type not supported: $${name}, ${typeof arg}`));
      return new FluentNone(`$${name}`);
  }
}
function resolveMessageReference(scope, {
  name,
  attr
}) {
  const message = scope.bundle._messages.get(name);
  if (!message) {
    scope.reportError(new ReferenceError(`Unknown message: ${name}`));
    return new FluentNone(name);
  }
  if (attr) {
    const attribute = message.attributes[attr];
    if (attribute) {
      return resolvePattern(scope, attribute);
    }
    scope.reportError(new ReferenceError(`Unknown attribute: ${attr}`));
    return new FluentNone(`${name}.${attr}`);
  }
  if (message.value) {
    return resolvePattern(scope, message.value);
  }
  scope.reportError(new ReferenceError(`No value: ${name}`));
  return new FluentNone(name);
}
function resolveTermReference(scope, {
  name,
  attr,
  args
}) {
  const id = `-${name}`;
  const term = scope.bundle._terms.get(id);
  if (!term) {
    scope.reportError(new ReferenceError(`Unknown term: ${id}`));
    return new FluentNone(id);
  }
  if (attr) {
    const attribute = term.attributes[attr];
    if (attribute) {
      scope.params = getArguments(scope, args).named;
      const resolved2 = resolvePattern(scope, attribute);
      scope.params = null;
      return resolved2;
    }
    scope.reportError(new ReferenceError(`Unknown attribute: ${attr}`));
    return new FluentNone(`${id}.${attr}`);
  }
  scope.params = getArguments(scope, args).named;
  const resolved = resolvePattern(scope, term.value);
  scope.params = null;
  return resolved;
}
function resolveFunctionReference(scope, {
  name,
  args
}) {
  let func = scope.bundle._functions[name];
  if (!func) {
    scope.reportError(new ReferenceError(`Unknown function: ${name}()`));
    return new FluentNone(`${name}()`);
  }
  if (typeof func !== "function") {
    scope.reportError(new TypeError(`Function ${name}() is not callable`));
    return new FluentNone(`${name}()`);
  }
  try {
    let resolved = getArguments(scope, args);
    return func(resolved.positional, resolved.named);
  } catch (err) {
    scope.reportError(err);
    return new FluentNone(`${name}()`);
  }
}
function resolveSelectExpression(scope, {
  selector,
  variants,
  star
}) {
  let sel = resolveExpression(scope, selector);
  if (sel instanceof FluentNone) {
    return getDefault(scope, variants, star);
  }
  for (const variant of variants) {
    const key = resolveExpression(scope, variant.key);
    if (match(scope, sel, key)) {
      return resolvePattern(scope, variant.value);
    }
  }
  return getDefault(scope, variants, star);
}
function resolveComplexPattern(scope, ptn) {
  if (scope.dirty.has(ptn)) {
    scope.reportError(new RangeError("Cyclic reference"));
    return new FluentNone();
  }
  scope.dirty.add(ptn);
  const result = [];
  const useIsolating = scope.bundle._useIsolating && ptn.length > 1;
  for (const elem of ptn) {
    if (typeof elem === "string") {
      result.push(scope.bundle._transform(elem));
      continue;
    }
    scope.placeables++;
    if (scope.placeables > MAX_PLACEABLES) {
      scope.dirty.delete(ptn);
      throw new RangeError(`Too many placeables expanded: ${scope.placeables}, max allowed is ${MAX_PLACEABLES}`);
    }
    if (useIsolating) {
      result.push(FSI);
    }
    result.push(resolveExpression(scope, elem).toString(scope));
    if (useIsolating) {
      result.push(PDI);
    }
  }
  scope.dirty.delete(ptn);
  return result.join("");
}
function resolvePattern(scope, value) {
  if (typeof value === "string") {
    return scope.bundle._transform(value);
  }
  return resolveComplexPattern(scope, value);
}
;
class Scope {
  constructor(bundle, errors, args) {
    this.dirty = /* @__PURE__ */ new WeakSet();
    this.params = null;
    this.placeables = 0;
    this.bundle = bundle;
    this.errors = errors;
    this.args = args;
  }
  reportError(error) {
    if (!this.errors || !(error instanceof Error)) {
      throw error;
    }
    this.errors.push(error);
  }
  memoizeIntlObject(ctor, opts) {
    let cache2 = this.bundle._intls.get(ctor);
    if (!cache2) {
      cache2 = {};
      this.bundle._intls.set(ctor, cache2);
    }
    let id = JSON.stringify(opts);
    if (!cache2[id]) {
      cache2[id] = new ctor(this.bundle.locales, opts);
    }
    return cache2[id];
  }
}
;
function values(opts, allowed) {
  const unwrapped = /* @__PURE__ */ Object.create(null);
  for (const [name, opt] of Object.entries(opts)) {
    if (allowed.includes(name)) {
      unwrapped[name] = opt.valueOf();
    }
  }
  return unwrapped;
}
const NUMBER_ALLOWED = ["unitDisplay", "currencyDisplay", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits"];
function NUMBER(args, opts) {
  let arg = args[0];
  if (arg instanceof FluentNone) {
    return new FluentNone(`NUMBER(${arg.valueOf()})`);
  }
  if (arg instanceof FluentNumber) {
    return new FluentNumber(arg.valueOf(), {
      ...arg.opts,
      ...values(opts, NUMBER_ALLOWED)
    });
  }
  if (arg instanceof FluentDateTime) {
    return new FluentNumber(arg.valueOf(), {
      ...values(opts, NUMBER_ALLOWED)
    });
  }
  throw new TypeError("Invalid argument to NUMBER");
}
const DATETIME_ALLOWED = ["dateStyle", "timeStyle", "fractionalSecondDigits", "dayPeriod", "hour12", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName"];
function DATETIME(args, opts) {
  let arg = args[0];
  if (arg instanceof FluentNone) {
    return new FluentNone(`DATETIME(${arg.valueOf()})`);
  }
  if (arg instanceof FluentDateTime) {
    return new FluentDateTime(arg.valueOf(), {
      ...arg.opts,
      ...values(opts, DATETIME_ALLOWED)
    });
  }
  if (arg instanceof FluentNumber) {
    return new FluentDateTime(arg.valueOf(), {
      ...values(opts, DATETIME_ALLOWED)
    });
  }
  throw new TypeError("Invalid argument to DATETIME");
}
;
const cache = /* @__PURE__ */ new Map();
function getMemoizerForLocale(locales) {
  const stringLocale = Array.isArray(locales) ? locales.join(" ") : locales;
  let memoizer = cache.get(stringLocale);
  if (memoizer === void 0) {
    memoizer = /* @__PURE__ */ new Map();
    cache.set(stringLocale, memoizer);
  }
  return memoizer;
}
;
class FluentBundle {
  constructor(locales, {
    functions,
    useIsolating = true,
    transform = (v) => v
  } = {}) {
    this._terms = /* @__PURE__ */ new Map();
    this._messages = /* @__PURE__ */ new Map();
    this.locales = Array.isArray(locales) ? locales : [locales];
    this._functions = {
      NUMBER,
      DATETIME,
      ...functions
    };
    this._useIsolating = useIsolating;
    this._transform = transform;
    this._intls = getMemoizerForLocale(locales);
  }
  hasMessage(id) {
    return this._messages.has(id);
  }
  getMessage(id) {
    return this._messages.get(id);
  }
  addResource(res, {
    allowOverrides = false
  } = {}) {
    const errors = [];
    for (let i = 0; i < res.body.length; i++) {
      let entry = res.body[i];
      if (entry.id.startsWith("-")) {
        if (allowOverrides === false && this._terms.has(entry.id)) {
          errors.push(new Error(`Attempt to override an existing term: "${entry.id}"`));
          continue;
        }
        this._terms.set(entry.id, entry);
      } else {
        if (allowOverrides === false && this._messages.has(entry.id)) {
          errors.push(new Error(`Attempt to override an existing message: "${entry.id}"`));
          continue;
        }
        this._messages.set(entry.id, entry);
      }
    }
    return errors;
  }
  formatPattern(pattern, args = null, errors = null) {
    if (typeof pattern === "string") {
      return this._transform(pattern);
    }
    let scope = new Scope(this, errors, args);
    try {
      let value = resolveComplexPattern(scope, pattern);
      return value.toString(scope);
    } catch (err) {
      if (scope.errors && err instanceof Error) {
        scope.errors.push(err);
        return new FluentNone().toString(scope);
      }
      throw err;
    }
  }
}
;
const RE_MESSAGE_START = /^(-?[a-zA-Z][\w-]*) *= */gm;
const RE_ATTRIBUTE_START = /\.([a-zA-Z][\w-]*) *= */y;
const RE_VARIANT_START = /\*?\[/y;
const RE_NUMBER_LITERAL = /(-?[0-9]+(?:\.([0-9]+))?)/y;
const RE_IDENTIFIER = /([a-zA-Z][\w-]*)/y;
const RE_REFERENCE = /([$-])?([a-zA-Z][\w-]*)(?:\.([a-zA-Z][\w-]*))?/y;
const RE_FUNCTION_NAME = /^[A-Z][A-Z0-9_-]*$/;
const RE_TEXT_RUN = /([^{}\n\r]+)/y;
const RE_STRING_RUN = /([^\\"\n\r]*)/y;
const RE_STRING_ESCAPE = /\\([\\"])/y;
const RE_UNICODE_ESCAPE = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{6})/y;
const RE_LEADING_NEWLINES = /^\n+/;
const RE_TRAILING_SPACES = / +$/;
const RE_BLANK_LINES = / *\r?\n/g;
const RE_INDENT = /( *)$/;
const TOKEN_BRACE_OPEN = /{\s*/y;
const TOKEN_BRACE_CLOSE = /\s*}/y;
const TOKEN_BRACKET_OPEN = /\[\s*/y;
const TOKEN_BRACKET_CLOSE = /\s*] */y;
const TOKEN_PAREN_OPEN = /\s*\(\s*/y;
const TOKEN_ARROW = /\s*->\s*/y;
const TOKEN_COLON = /\s*:\s*/y;
const TOKEN_COMMA = /\s*,?\s*/y;
const TOKEN_BLANK = /\s+/y;
class FluentResource {
  constructor(source) {
    this.body = [];
    RE_MESSAGE_START.lastIndex = 0;
    let cursor = 0;
    while (true) {
      let next = RE_MESSAGE_START.exec(source);
      if (next === null) {
        break;
      }
      cursor = RE_MESSAGE_START.lastIndex;
      try {
        this.body.push(parseMessage(next[1]));
      } catch (err) {
        if (err instanceof SyntaxError) {
          continue;
        }
        throw err;
      }
    }
    function test(re) {
      re.lastIndex = cursor;
      return re.test(source);
    }
    function consumeChar(char, errorClass) {
      if (source[cursor] === char) {
        cursor++;
        return true;
      }
      if (errorClass) {
        throw new errorClass(`Expected ${char}`);
      }
      return false;
    }
    function consumeToken(re, errorClass) {
      if (test(re)) {
        cursor = re.lastIndex;
        return true;
      }
      if (errorClass) {
        throw new errorClass(`Expected ${re.toString()}`);
      }
      return false;
    }
    function match2(re) {
      re.lastIndex = cursor;
      let result = re.exec(source);
      if (result === null) {
        throw new SyntaxError(`Expected ${re.toString()}`);
      }
      cursor = re.lastIndex;
      return result;
    }
    function match1(re) {
      return match2(re)[1];
    }
    function parseMessage(id) {
      let value = parsePattern();
      let attributes = parseAttributes();
      if (value === null && Object.keys(attributes).length === 0) {
        throw new SyntaxError("Expected message value or attributes");
      }
      return {
        id,
        value,
        attributes
      };
    }
    function parseAttributes() {
      let attrs = /* @__PURE__ */ Object.create(null);
      while (test(RE_ATTRIBUTE_START)) {
        let name = match1(RE_ATTRIBUTE_START);
        let value = parsePattern();
        if (value === null) {
          throw new SyntaxError("Expected attribute value");
        }
        attrs[name] = value;
      }
      return attrs;
    }
    function parsePattern() {
      let first;
      if (test(RE_TEXT_RUN)) {
        first = match1(RE_TEXT_RUN);
      }
      if (source[cursor] === "{" || source[cursor] === "}") {
        return parsePatternElements(first ? [first] : [], Infinity);
      }
      let indent = parseIndent();
      if (indent) {
        if (first) {
          return parsePatternElements([first, indent], indent.length);
        }
        indent.value = trim(indent.value, RE_LEADING_NEWLINES);
        return parsePatternElements([indent], indent.length);
      }
      if (first) {
        return trim(first, RE_TRAILING_SPACES);
      }
      return null;
    }
    function parsePatternElements(elements = [], commonIndent) {
      while (true) {
        if (test(RE_TEXT_RUN)) {
          elements.push(match1(RE_TEXT_RUN));
          continue;
        }
        if (source[cursor] === "{") {
          elements.push(parsePlaceable());
          continue;
        }
        if (source[cursor] === "}") {
          throw new SyntaxError("Unbalanced closing brace");
        }
        let indent = parseIndent();
        if (indent) {
          elements.push(indent);
          commonIndent = Math.min(commonIndent, indent.length);
          continue;
        }
        break;
      }
      let lastIndex = elements.length - 1;
      let lastElement = elements[lastIndex];
      if (typeof lastElement === "string") {
        elements[lastIndex] = trim(lastElement, RE_TRAILING_SPACES);
      }
      let baked = [];
      for (let element of elements) {
        if (element instanceof Indent) {
          element = element.value.slice(0, element.value.length - commonIndent);
        }
        if (element) {
          baked.push(element);
        }
      }
      return baked;
    }
    function parsePlaceable() {
      consumeToken(TOKEN_BRACE_OPEN, SyntaxError);
      let selector = parseInlineExpression();
      if (consumeToken(TOKEN_BRACE_CLOSE)) {
        return selector;
      }
      if (consumeToken(TOKEN_ARROW)) {
        let variants = parseVariants();
        consumeToken(TOKEN_BRACE_CLOSE, SyntaxError);
        return {
          type: "select",
          selector,
          ...variants
        };
      }
      throw new SyntaxError("Unclosed placeable");
    }
    function parseInlineExpression() {
      if (source[cursor] === "{") {
        return parsePlaceable();
      }
      if (test(RE_REFERENCE)) {
        let [, sigil, name, attr = null] = match2(RE_REFERENCE);
        if (sigil === "$") {
          return {
            type: "var",
            name
          };
        }
        if (consumeToken(TOKEN_PAREN_OPEN)) {
          let args = parseArguments();
          if (sigil === "-") {
            return {
              type: "term",
              name,
              attr,
              args
            };
          }
          if (RE_FUNCTION_NAME.test(name)) {
            return {
              type: "func",
              name,
              args
            };
          }
          throw new SyntaxError("Function names must be all upper-case");
        }
        if (sigil === "-") {
          return {
            type: "term",
            name,
            attr,
            args: []
          };
        }
        return {
          type: "mesg",
          name,
          attr
        };
      }
      return parseLiteral();
    }
    function parseArguments() {
      let args = [];
      while (true) {
        switch (source[cursor]) {
          case ")":
            cursor++;
            return args;
          case void 0:
            throw new SyntaxError("Unclosed argument list");
        }
        args.push(parseArgument());
        consumeToken(TOKEN_COMMA);
      }
    }
    function parseArgument() {
      let expr = parseInlineExpression();
      if (expr.type !== "mesg") {
        return expr;
      }
      if (consumeToken(TOKEN_COLON)) {
        return {
          type: "narg",
          name: expr.name,
          value: parseLiteral()
        };
      }
      return expr;
    }
    function parseVariants() {
      let variants = [];
      let count = 0;
      let star;
      while (test(RE_VARIANT_START)) {
        if (consumeChar("*")) {
          star = count;
        }
        let key = parseVariantKey();
        let value = parsePattern();
        if (value === null) {
          throw new SyntaxError("Expected variant value");
        }
        variants[count++] = {
          key,
          value
        };
      }
      if (count === 0) {
        return null;
      }
      if (star === void 0) {
        throw new SyntaxError("Expected default variant");
      }
      return {
        variants,
        star
      };
    }
    function parseVariantKey() {
      consumeToken(TOKEN_BRACKET_OPEN, SyntaxError);
      let key;
      if (test(RE_NUMBER_LITERAL)) {
        key = parseNumberLiteral();
      } else {
        key = {
          type: "str",
          value: match1(RE_IDENTIFIER)
        };
      }
      consumeToken(TOKEN_BRACKET_CLOSE, SyntaxError);
      return key;
    }
    function parseLiteral() {
      if (test(RE_NUMBER_LITERAL)) {
        return parseNumberLiteral();
      }
      if (source[cursor] === '"') {
        return parseStringLiteral();
      }
      throw new SyntaxError("Invalid expression");
    }
    function parseNumberLiteral() {
      let [, value, fraction = ""] = match2(RE_NUMBER_LITERAL);
      let precision = fraction.length;
      return {
        type: "num",
        value: parseFloat(value),
        precision
      };
    }
    function parseStringLiteral() {
      consumeChar('"', SyntaxError);
      let value = "";
      while (true) {
        value += match1(RE_STRING_RUN);
        if (source[cursor] === "\\") {
          value += parseEscapeSequence();
          continue;
        }
        if (consumeChar('"')) {
          return {
            type: "str",
            value
          };
        }
        throw new SyntaxError("Unclosed string literal");
      }
    }
    function parseEscapeSequence() {
      if (test(RE_STRING_ESCAPE)) {
        return match1(RE_STRING_ESCAPE);
      }
      if (test(RE_UNICODE_ESCAPE)) {
        let [, codepoint4, codepoint6] = match2(RE_UNICODE_ESCAPE);
        let codepoint = parseInt(codepoint4 || codepoint6, 16);
        return codepoint <= 55295 || 57344 <= codepoint ? String.fromCodePoint(codepoint) : "\uFFFD";
      }
      throw new SyntaxError("Unknown escape sequence");
    }
    function parseIndent() {
      let start = cursor;
      consumeToken(TOKEN_BLANK);
      switch (source[cursor]) {
        case ".":
        case "[":
        case "*":
        case "}":
        case void 0:
          return false;
        case "{":
          return makeIndent(source.slice(start, cursor));
      }
      if (source[cursor - 1] === " ") {
        return makeIndent(source.slice(start, cursor));
      }
      return false;
    }
    function trim(text, re) {
      return text.replace(re, "");
    }
    function makeIndent(blank) {
      let value = blank.replace(RE_BLANK_LINES, "\n");
      let length = RE_INDENT.exec(blank)[1].length;
      return new Indent(value, length);
    }
  }
}
class Indent {
  constructor(value, length) {
    this.value = value;
    this.length = length;
  }
}
;
;
const reOverlay = /<|&#?\w+;/;
const TEXT_LEVEL_ELEMENTS = {
  "http://www.w3.org/1999/xhtml": ["em", "strong", "small", "s", "cite", "q", "dfn", "abbr", "data", "time", "code", "var", "samp", "kbd", "sub", "sup", "i", "b", "u", "mark", "bdi", "bdo", "span", "br", "wbr"]
};
const LOCALIZABLE_ATTRIBUTES = {
  "http://www.w3.org/1999/xhtml": {
    global: ["title", "aria-label", "aria-valuetext"],
    a: ["download"],
    area: ["download", "alt"],
    input: ["alt", "placeholder"],
    menuitem: ["label"],
    menu: ["label"],
    optgroup: ["label"],
    option: ["label"],
    track: ["label"],
    img: ["alt"],
    textarea: ["placeholder"],
    th: ["abbr"]
  },
  "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul": {
    global: ["accesskey", "aria-label", "aria-valuetext", "label", "title", "tooltiptext"],
    description: ["value"],
    key: ["key", "keycode"],
    label: ["value"],
    textbox: ["placeholder", "value"]
  }
};
function translateElement(element, translation) {
  const {
    value
  } = translation;
  if (typeof value === "string") {
    if (element.localName === "title" && element.namespaceURI === "http://www.w3.org/1999/xhtml") {
      element.textContent = value;
    } else if (!reOverlay.test(value)) {
      element.textContent = value;
    } else {
      const templateElement = element.ownerDocument.createElementNS("http://www.w3.org/1999/xhtml", "template");
      templateElement.innerHTML = value;
      overlayChildNodes(templateElement.content, element);
    }
  }
  overlayAttributes(translation, element);
}
function overlayChildNodes(fromFragment, toElement) {
  for (const childNode of fromFragment.childNodes) {
    if (childNode.nodeType === childNode.TEXT_NODE) {
      continue;
    }
    if (childNode.hasAttribute("data-l10n-name")) {
      const sanitized = getNodeForNamedElement(toElement, childNode);
      fromFragment.replaceChild(sanitized, childNode);
      continue;
    }
    if (isElementAllowed(childNode)) {
      const sanitized = createSanitizedElement(childNode);
      fromFragment.replaceChild(sanitized, childNode);
      continue;
    }
    console.warn(`An element of forbidden type "${childNode.localName}" was found in the translation. Only safe text-level elements and elements with data-l10n-name are allowed.`);
    fromFragment.replaceChild(createTextNodeFromTextContent(childNode), childNode);
  }
  toElement.textContent = "";
  toElement.appendChild(fromFragment);
}
function hasAttribute(attributes, name) {
  if (!attributes) {
    return false;
  }
  for (let attr of attributes) {
    if (attr.name === name) {
      return true;
    }
  }
  return false;
}
function overlayAttributes(fromElement, toElement) {
  const explicitlyAllowed = toElement.hasAttribute("data-l10n-attrs") ? toElement.getAttribute("data-l10n-attrs").split(",").map((i) => i.trim()) : null;
  for (const attr of Array.from(toElement.attributes)) {
    if (isAttrNameLocalizable(attr.name, toElement, explicitlyAllowed) && !hasAttribute(fromElement.attributes, attr.name)) {
      toElement.removeAttribute(attr.name);
    }
  }
  if (!fromElement.attributes) {
    return;
  }
  for (const attr of Array.from(fromElement.attributes)) {
    if (isAttrNameLocalizable(attr.name, toElement, explicitlyAllowed) && toElement.getAttribute(attr.name) !== attr.value) {
      toElement.setAttribute(attr.name, attr.value);
    }
  }
}
function getNodeForNamedElement(sourceElement, translatedChild) {
  const childName = translatedChild.getAttribute("data-l10n-name");
  const sourceChild = sourceElement.querySelector(`[data-l10n-name="${childName}"]`);
  if (!sourceChild) {
    console.warn(`An element named "${childName}" wasn't found in the source.`);
    return createTextNodeFromTextContent(translatedChild);
  }
  if (sourceChild.localName !== translatedChild.localName) {
    console.warn(`An element named "${childName}" was found in the translation but its type ${translatedChild.localName} didn't match the element found in the source (${sourceChild.localName}).`);
    return createTextNodeFromTextContent(translatedChild);
  }
  sourceElement.removeChild(sourceChild);
  const clone = sourceChild.cloneNode(false);
  return shallowPopulateUsing(translatedChild, clone);
}
function createSanitizedElement(element) {
  const clone = element.ownerDocument.createElement(element.localName);
  return shallowPopulateUsing(element, clone);
}
function createTextNodeFromTextContent(element) {
  return element.ownerDocument.createTextNode(element.textContent);
}
function isElementAllowed(element) {
  const allowed = TEXT_LEVEL_ELEMENTS[element.namespaceURI];
  return allowed && allowed.includes(element.localName);
}
function isAttrNameLocalizable(name, element, explicitlyAllowed = null) {
  if (explicitlyAllowed && explicitlyAllowed.includes(name)) {
    return true;
  }
  const allowed = LOCALIZABLE_ATTRIBUTES[element.namespaceURI];
  if (!allowed) {
    return false;
  }
  const attrName = name.toLowerCase();
  const elemName = element.localName;
  if (allowed.global.includes(attrName)) {
    return true;
  }
  if (!allowed[elemName]) {
    return false;
  }
  if (allowed[elemName].includes(attrName)) {
    return true;
  }
  if (element.namespaceURI === "http://www.w3.org/1999/xhtml" && elemName === "input" && attrName === "value") {
    const type = element.type.toLowerCase();
    if (type === "submit" || type === "button" || type === "reset") {
      return true;
    }
  }
  return false;
}
function shallowPopulateUsing(fromElement, toElement) {
  toElement.textContent = fromElement.textContent;
  overlayAttributes(fromElement, toElement);
  return toElement;
}
;
class CachedIterable extends Array {
  static from(iterable) {
    if (iterable instanceof this) {
      return iterable;
    }
    return new this(iterable);
  }
}
;
class CachedSyncIterable extends CachedIterable {
  constructor(iterable) {
    super();
    if (Symbol.iterator in Object(iterable)) {
      this.iterator = iterable[Symbol.iterator]();
    } else {
      throw new TypeError("Argument must implement the iteration protocol.");
    }
  }
  [Symbol.iterator]() {
    const cached = this;
    let cur = 0;
    return {
      next() {
        if (cached.length <= cur) {
          cached.push(cached.iterator.next());
        }
        return cached[cur++];
      }
    };
  }
  touchNext(count = 1) {
    let idx = 0;
    while (idx++ < count) {
      const last = this[this.length - 1];
      if (last && last.done) {
        break;
      }
      this.push(this.iterator.next());
    }
    return this[this.length - 1];
  }
}
;
class CachedAsyncIterable extends CachedIterable {
  constructor(iterable) {
    super();
    if (Symbol.asyncIterator in Object(iterable)) {
      this.iterator = iterable[Symbol.asyncIterator]();
    } else if (Symbol.iterator in Object(iterable)) {
      this.iterator = iterable[Symbol.iterator]();
    } else {
      throw new TypeError("Argument must implement the iteration protocol.");
    }
  }
  [Symbol.asyncIterator]() {
    const cached = this;
    let cur = 0;
    return {
      async next() {
        if (cached.length <= cur) {
          cached.push(cached.iterator.next());
        }
        return cached[cur++];
      }
    };
  }
  async touchNext(count = 1) {
    let idx = 0;
    while (idx++ < count) {
      const last = this[this.length - 1];
      if (last && (await last).done) {
        break;
      }
      this.push(this.iterator.next());
    }
    return this[this.length - 1];
  }
}
;
;
class Localization {
  constructor(resourceIds = [], generateBundles) {
    this.resourceIds = resourceIds;
    this.generateBundles = generateBundles;
    this.onChange(true);
  }
  addResourceIds(resourceIds, eager = false) {
    this.resourceIds.push(...resourceIds);
    this.onChange(eager);
    return this.resourceIds.length;
  }
  removeResourceIds(resourceIds) {
    this.resourceIds = this.resourceIds.filter((r) => !resourceIds.includes(r));
    this.onChange();
    return this.resourceIds.length;
  }
  async formatWithFallback(keys, method) {
    const translations = [];
    let hasAtLeastOneBundle = false;
    for await (const bundle of this.bundles) {
      hasAtLeastOneBundle = true;
      const missingIds = keysFromBundle(method, bundle, keys, translations);
      if (missingIds.size === 0) {
        break;
      }
      if (typeof console !== "undefined") {
        const locale = bundle.locales[0];
        const ids = Array.from(missingIds).join(", ");
        console.warn(`[fluent] Missing translations in ${locale}: ${ids}`);
      }
    }
    if (!hasAtLeastOneBundle && typeof console !== "undefined") {
      console.warn(`[fluent] Request for keys failed because no resource bundles got generated.
  keys: ${JSON.stringify(keys)}.
  resourceIds: ${JSON.stringify(this.resourceIds)}.`);
    }
    return translations;
  }
  formatMessages(keys) {
    return this.formatWithFallback(keys, messageFromBundle);
  }
  formatValues(keys) {
    return this.formatWithFallback(keys, valueFromBundle);
  }
  async formatValue(id, args) {
    const [val] = await this.formatValues([{
      id,
      args
    }]);
    return val;
  }
  handleEvent() {
    this.onChange();
  }
  onChange(eager = false) {
    this.bundles = CachedAsyncIterable.from(this.generateBundles(this.resourceIds));
    if (eager) {
      this.bundles.touchNext(2);
    }
  }
}
function valueFromBundle(bundle, errors, message, args) {
  if (message.value) {
    return bundle.formatPattern(message.value, args, errors);
  }
  return null;
}
function messageFromBundle(bundle, errors, message, args) {
  const formatted = {
    value: null,
    attributes: null
  };
  if (message.value) {
    formatted.value = bundle.formatPattern(message.value, args, errors);
  }
  let attrNames = Object.keys(message.attributes);
  if (attrNames.length > 0) {
    formatted.attributes = new Array(attrNames.length);
    for (let [i, name] of attrNames.entries()) {
      let value = bundle.formatPattern(message.attributes[name], args, errors);
      formatted.attributes[i] = {
        name,
        value
      };
    }
  }
  return formatted;
}
function keysFromBundle(method, bundle, keys, translations) {
  const messageErrors = [];
  const missingIds = /* @__PURE__ */ new Set();
  keys.forEach(({
    id,
    args
  }, i) => {
    if (translations[i] !== void 0) {
      return;
    }
    let message = bundle.getMessage(id);
    if (message) {
      messageErrors.length = 0;
      translations[i] = method(bundle, messageErrors, message, args);
      if (messageErrors.length > 0 && typeof console !== "undefined") {
        const locale = bundle.locales[0];
        const errors = messageErrors.join(", ");
        console.warn(`[fluent][resolver] errors in ${locale}/${id}: ${errors}.`);
      }
    } else {
      missingIds.add(id);
    }
  });
  return missingIds;
}
;
const L10NID_ATTR_NAME = "data-l10n-id";
const L10NARGS_ATTR_NAME = "data-l10n-args";
const L10N_ELEMENT_QUERY = `[${L10NID_ATTR_NAME}]`;
class DOMLocalization extends Localization {
  constructor(resourceIds, generateBundles) {
    super(resourceIds, generateBundles);
    this.roots = /* @__PURE__ */ new Set();
    this.pendingrAF = null;
    this.pendingElements = /* @__PURE__ */ new Set();
    this.windowElement = null;
    this.mutationObserver = null;
    this.observerConfig = {
      attributes: true,
      characterData: false,
      childList: true,
      subtree: true,
      attributeFilter: [L10NID_ATTR_NAME, L10NARGS_ATTR_NAME]
    };
  }
  onChange(eager = false) {
    super.onChange(eager);
    if (this.roots) {
      this.translateRoots();
    }
  }
  setAttributes(element, id, args) {
    element.setAttribute(L10NID_ATTR_NAME, id);
    if (args) {
      element.setAttribute(L10NARGS_ATTR_NAME, JSON.stringify(args));
    } else {
      element.removeAttribute(L10NARGS_ATTR_NAME);
    }
    return element;
  }
  getAttributes(element) {
    return {
      id: element.getAttribute(L10NID_ATTR_NAME),
      args: JSON.parse(element.getAttribute(L10NARGS_ATTR_NAME) || null)
    };
  }
  connectRoot(newRoot) {
    for (const root of this.roots) {
      if (root === newRoot || root.contains(newRoot) || newRoot.contains(root)) {
        throw new Error("Cannot add a root that overlaps with existing root.");
      }
    }
    if (this.windowElement) {
      if (this.windowElement !== newRoot.ownerDocument.defaultView) {
        throw new Error(`Cannot connect a root:
          DOMLocalization already has a root from a different window.`);
      }
    } else {
      this.windowElement = newRoot.ownerDocument.defaultView;
      this.mutationObserver = new this.windowElement.MutationObserver((mutations) => this.translateMutations(mutations));
    }
    this.roots.add(newRoot);
    this.mutationObserver.observe(newRoot, this.observerConfig);
  }
  disconnectRoot(root) {
    this.roots.delete(root);
    this.pauseObserving();
    if (this.roots.size === 0) {
      this.mutationObserver = null;
      if (this.windowElement && this.pendingrAF) {
        this.windowElement.cancelAnimationFrame(this.pendingrAF);
      }
      this.windowElement = null;
      this.pendingrAF = null;
      this.pendingElements.clear();
      return true;
    }
    this.resumeObserving();
    return false;
  }
  translateRoots() {
    const roots = Array.from(this.roots);
    return Promise.all(roots.map((root) => this.translateFragment(root)));
  }
  pauseObserving() {
    if (!this.mutationObserver) {
      return;
    }
    this.translateMutations(this.mutationObserver.takeRecords());
    this.mutationObserver.disconnect();
  }
  resumeObserving() {
    if (!this.mutationObserver) {
      return;
    }
    for (const root of this.roots) {
      this.mutationObserver.observe(root, this.observerConfig);
    }
  }
  translateMutations(mutations) {
    for (const mutation of mutations) {
      switch (mutation.type) {
        case "attributes":
          if (mutation.target.hasAttribute("data-l10n-id")) {
            this.pendingElements.add(mutation.target);
          }
          break;
        case "childList":
          for (const addedNode of mutation.addedNodes) {
            if (addedNode.nodeType === addedNode.ELEMENT_NODE) {
              if (addedNode.childElementCount) {
                for (const element of this.getTranslatables(addedNode)) {
                  this.pendingElements.add(element);
                }
              } else if (addedNode.hasAttribute(L10NID_ATTR_NAME)) {
                this.pendingElements.add(addedNode);
              }
            }
          }
          break;
      }
    }
    if (this.pendingElements.size > 0) {
      if (this.pendingrAF === null) {
        this.pendingrAF = this.windowElement.requestAnimationFrame(() => {
          this.translateElements(Array.from(this.pendingElements));
          this.pendingElements.clear();
          this.pendingrAF = null;
        });
      }
    }
  }
  translateFragment(frag) {
    return this.translateElements(this.getTranslatables(frag));
  }
  async translateElements(elements) {
    if (!elements.length) {
      return void 0;
    }
    const keys = elements.map(this.getKeysForElement);
    const translations = await this.formatMessages(keys);
    return this.applyTranslations(elements, translations);
  }
  applyTranslations(elements, translations) {
    this.pauseObserving();
    for (let i = 0; i < elements.length; i++) {
      if (translations[i] !== void 0) {
        translateElement(elements[i], translations[i]);
      }
    }
    this.resumeObserving();
  }
  getTranslatables(element) {
    const nodes = Array.from(element.querySelectorAll(L10N_ELEMENT_QUERY));
    if (typeof element.hasAttribute === "function" && element.hasAttribute(L10NID_ATTR_NAME)) {
      nodes.push(element);
    }
    return nodes;
  }
  getKeysForElement(element) {
    return {
      id: element.getAttribute(L10NID_ATTR_NAME),
      args: JSON.parse(element.getAttribute(L10NARGS_ATTR_NAME) || null)
    };
  }
}
;
;
const _L10n = class _L10n {
  constructor({
    lang,
    isRTL
  }, l10n = null) {
    __privateAdd(this, _dir);
    __privateAdd(this, _elements);
    __privateAdd(this, _lang);
    __privateAdd(this, _l10n);
    var _a2, _b;
    __privateSet(this, _lang, __privateMethod(_a2 = _L10n, _L10n_static, fixupLangCode_fn).call(_a2, lang));
    __privateSet(this, _l10n, l10n);
    __privateSet(this, _dir, (isRTL != null ? isRTL : __privateMethod(_b = _L10n, _L10n_static, isRTL_fn).call(_b, __privateGet(this, _lang))) ? "rtl" : "ltr");
  }
  _setL10n(l10n) {
    __privateSet(this, _l10n, l10n);
  }
  getLanguage() {
    return __privateGet(this, _lang);
  }
  getDirection() {
    return __privateGet(this, _dir);
  }
  async get(ids, args = null, fallback) {
    var _a2;
    if (Array.isArray(ids)) {
      ids = ids.map((id) => ({
        id
      }));
      const messages2 = await __privateGet(this, _l10n).formatMessages(ids);
      return messages2.map((message) => message.value);
    }
    const messages = await __privateGet(this, _l10n).formatMessages([{
      id: ids,
      args
    }]);
    return ((_a2 = messages[0]) == null ? void 0 : _a2.value) || fallback;
  }
  async translate(element) {
    (__privateGet(this, _elements) || __privateSet(this, _elements, /* @__PURE__ */ new Set())).add(element);
    try {
      __privateGet(this, _l10n).connectRoot(element);
      await __privateGet(this, _l10n).translateRoots();
    } catch {
    }
  }
  async translateOnce(element) {
    try {
      await __privateGet(this, _l10n).translateElements([element]);
    } catch (ex) {
      console.error("translateOnce:", ex);
    }
  }
  async destroy() {
    if (__privateGet(this, _elements)) {
      for (const element of __privateGet(this, _elements)) {
        __privateGet(this, _l10n).disconnectRoot(element);
      }
      __privateGet(this, _elements).clear();
      __privateSet(this, _elements, null);
    }
    __privateGet(this, _l10n).pauseObserving();
  }
  pause() {
    __privateGet(this, _l10n).pauseObserving();
  }
  resume() {
    __privateGet(this, _l10n).resumeObserving();
  }
};
_dir = new WeakMap();
_elements = new WeakMap();
_lang = new WeakMap();
_l10n = new WeakMap();
_L10n_static = new WeakSet();
fixupLangCode_fn = function(langCode) {
  langCode = (langCode == null ? void 0 : langCode.toLowerCase()) || "en-us";
  const PARTIAL_LANG_CODES = {
    en: "en-us",
    es: "es-es",
    fy: "fy-nl",
    ga: "ga-ie",
    gu: "gu-in",
    hi: "hi-in",
    hy: "hy-am",
    nb: "nb-no",
    ne: "ne-np",
    nn: "nn-no",
    pa: "pa-in",
    pt: "pt-pt",
    sv: "sv-se",
    zh: "zh-cn"
  };
  return PARTIAL_LANG_CODES[langCode] || langCode;
};
isRTL_fn = function(lang) {
  const shortCode = lang.split("-", 1)[0];
  return ["ar", "he", "fa", "ps", "ur"].includes(shortCode);
};
__privateAdd(_L10n, _L10n_static);
let L10n = _L10n;
const GenericL10n = null;
;
function createBundle(lang, text) {
  const resource = new FluentResource(text);
  const bundle = new FluentBundle(lang);
  const errors = bundle.addResource(resource);
  if (errors.length) {
    console.error("L10n errors", errors);
  }
  return bundle;
}
const _genericl10n_GenericL10n = class _genericl10n_GenericL10n extends L10n {
  constructor(lang) {
    super({
      lang
    });
    const generateBundles = !lang ? __privateMethod(_genericl10n_GenericL10n, _genericl10n_GenericL10n_static, generateBundlesFallback_fn).bind(_genericl10n_GenericL10n, this.getLanguage()) : __privateMethod(_genericl10n_GenericL10n, _genericl10n_GenericL10n_static, generateBundles_fn).bind(_genericl10n_GenericL10n, "en-us", this.getLanguage());
    this._setL10n(new DOMLocalization([], generateBundles));
  }
};
_genericl10n_GenericL10n_static = new WeakSet();
generateBundles_fn = async function* (defaultLang, baseLang) {
  const {
    baseURL,
    paths
  } = await __privateMethod(this, _genericl10n_GenericL10n_static, getPaths_fn).call(this);
  const langs = [baseLang];
  if (defaultLang !== baseLang) {
    const shortLang = baseLang.split("-", 1)[0];
    if (shortLang !== baseLang) {
      langs.push(shortLang);
    }
    langs.push(defaultLang);
  }
  for (const lang of langs) {
    const bundle = await __privateMethod(this, _genericl10n_GenericL10n_static, createBundle_fn).call(this, lang, baseURL, paths);
    if (bundle) {
      yield bundle;
    } else if (lang === "en-us") {
      yield __privateMethod(this, _genericl10n_GenericL10n_static, createBundleFallback_fn).call(this, lang);
    }
  }
};
createBundle_fn = async function(lang, baseURL, paths) {
  const path = paths[lang];
  if (!path) {
    return null;
  }
  const url = new URL(path, baseURL);
  const text = await fetchData(url, "text");
  return createBundle(lang, text);
};
getPaths_fn = async function() {
  try {
    const {
      href
    } = document.querySelector(`link[type="application/l10n"]`);
    const paths = await fetchData(href, "json");
    return {
      baseURL: href.replace(/[^/]*$/, "") || "./",
      paths
    };
  } catch {
  }
  return {
    baseURL: "./",
    paths: /* @__PURE__ */ Object.create(null)
  };
};
generateBundlesFallback_fn = async function* (lang) {
  yield __privateMethod(this, _genericl10n_GenericL10n_static, createBundleFallback_fn).call(this, lang);
};
createBundleFallback_fn = async function(lang) {
  const text = 'pdfjs-previous-button =\n    .title = Previous Page\npdfjs-previous-button-label = Previous\npdfjs-next-button =\n    .title = Next Page\npdfjs-next-button-label = Next\npdfjs-page-input =\n    .title = Page\npdfjs-of-pages = of { $pagesCount }\npdfjs-page-of-pages = ({ $pageNumber } of { $pagesCount })\npdfjs-zoom-out-button =\n    .title = Zoom Out\npdfjs-zoom-out-button-label = Zoom Out\npdfjs-zoom-in-button =\n    .title = Zoom In\npdfjs-zoom-in-button-label = Zoom In\npdfjs-zoom-select =\n    .title = Zoom\npdfjs-presentation-mode-button =\n    .title = Switch to Presentation Mode\npdfjs-presentation-mode-button-label = Presentation Mode\npdfjs-open-file-button =\n    .title = Open File\npdfjs-open-file-button-label = Open\npdfjs-print-button =\n    .title = Print\npdfjs-print-button-label = Print\npdfjs-save-button =\n    .title = Save\npdfjs-save-button-label = Save\npdfjs-download-button =\n    .title = Download\npdfjs-download-button-label = Download\npdfjs-bookmark-button =\n    .title = Current Page (View URL from Current Page)\npdfjs-bookmark-button-label = Current Page\npdfjs-tools-button =\n    .title = Tools\npdfjs-tools-button-label = Tools\npdfjs-first-page-button =\n    .title = Go to First Page\npdfjs-first-page-button-label = Go to First Page\npdfjs-last-page-button =\n    .title = Go to Last Page\npdfjs-last-page-button-label = Go to Last Page\npdfjs-page-rotate-cw-button =\n    .title = Rotate Clockwise\npdfjs-page-rotate-cw-button-label = Rotate Clockwise\npdfjs-page-rotate-ccw-button =\n    .title = Rotate Counterclockwise\npdfjs-page-rotate-ccw-button-label = Rotate Counterclockwise\npdfjs-cursor-text-select-tool-button =\n    .title = Enable Text Selection Tool\npdfjs-cursor-text-select-tool-button-label = Text Selection Tool\npdfjs-cursor-hand-tool-button =\n    .title = Enable Hand Tool\npdfjs-cursor-hand-tool-button-label = Hand Tool\npdfjs-scroll-page-button =\n    .title = Use Page Scrolling\npdfjs-scroll-page-button-label = Page Scrolling\npdfjs-scroll-vertical-button =\n    .title = Use Vertical Scrolling\npdfjs-scroll-vertical-button-label = Vertical Scrolling\npdfjs-scroll-horizontal-button =\n    .title = Use Horizontal Scrolling\npdfjs-scroll-horizontal-button-label = Horizontal Scrolling\npdfjs-scroll-wrapped-button =\n    .title = Use Wrapped Scrolling\npdfjs-scroll-wrapped-button-label = Wrapped Scrolling\npdfjs-spread-none-button =\n    .title = Do not join page spreads\npdfjs-spread-none-button-label = No Spreads\npdfjs-spread-odd-button =\n    .title = Join page spreads starting with odd-numbered pages\npdfjs-spread-odd-button-label = Odd Spreads\npdfjs-spread-even-button =\n    .title = Join page spreads starting with even-numbered pages\npdfjs-spread-even-button-label = Even Spreads\npdfjs-document-properties-button =\n    .title = Document Properties\u2026\npdfjs-document-properties-button-label = Document Properties\u2026\npdfjs-document-properties-file-name = File name:\npdfjs-document-properties-file-size = File size:\npdfjs-document-properties-size-kb = { NUMBER($kb, maximumSignificantDigits: 3) } KB ({ $b } bytes)\npdfjs-document-properties-size-mb = { NUMBER($mb, maximumSignificantDigits: 3) } MB ({ $b } bytes)\npdfjs-document-properties-title = Title:\npdfjs-document-properties-author = Author:\npdfjs-document-properties-subject = Subject:\npdfjs-document-properties-keywords = Keywords:\npdfjs-document-properties-creation-date = Creation Date:\npdfjs-document-properties-modification-date = Modification Date:\npdfjs-document-properties-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }\npdfjs-document-properties-creator = Creator:\npdfjs-document-properties-producer = PDF Producer:\npdfjs-document-properties-version = PDF Version:\npdfjs-document-properties-page-count = Page Count:\npdfjs-document-properties-page-size = Page Size:\npdfjs-document-properties-page-size-unit-inches = in\npdfjs-document-properties-page-size-unit-millimeters = mm\npdfjs-document-properties-page-size-orientation-portrait = portrait\npdfjs-document-properties-page-size-orientation-landscape = landscape\npdfjs-document-properties-page-size-name-a-three = A3\npdfjs-document-properties-page-size-name-a-four = A4\npdfjs-document-properties-page-size-name-letter = Letter\npdfjs-document-properties-page-size-name-legal = Legal\npdfjs-document-properties-page-size-dimension-string = { $width } \xD7 { $height } { $unit } ({ $orientation })\npdfjs-document-properties-page-size-dimension-name-string = { $width } \xD7 { $height } { $unit } ({ $name }, { $orientation })\npdfjs-document-properties-linearized = Fast Web View:\npdfjs-document-properties-linearized-yes = Yes\npdfjs-document-properties-linearized-no = No\npdfjs-document-properties-close-button = Close\npdfjs-print-progress-message = Preparing document for printing\u2026\npdfjs-print-progress-percent = { $progress }%\npdfjs-print-progress-close-button = Cancel\npdfjs-printing-not-supported = Warning: Printing is not fully supported by this browser.\npdfjs-printing-not-ready = Warning: The PDF is not fully loaded for printing.\npdfjs-toggle-sidebar-button =\n    .title = Toggle Sidebar\npdfjs-toggle-sidebar-notification-button =\n    .title = Toggle Sidebar (document contains outline/attachments/layers)\npdfjs-toggle-sidebar-button-label = Toggle Sidebar\npdfjs-document-outline-button =\n    .title = Show Document Outline (double-click to expand/collapse all items)\npdfjs-document-outline-button-label = Document Outline\npdfjs-attachments-button =\n    .title = Show Attachments\npdfjs-attachments-button-label = Attachments\npdfjs-layers-button =\n    .title = Show Layers (double-click to reset all layers to the default state)\npdfjs-layers-button-label = Layers\npdfjs-thumbs-button =\n    .title = Show Thumbnails\npdfjs-thumbs-button-label = Thumbnails\npdfjs-current-outline-item-button =\n    .title = Find Current Outline Item\npdfjs-current-outline-item-button-label = Current Outline Item\npdfjs-findbar-button =\n    .title = Find in Document\npdfjs-findbar-button-label = Find\npdfjs-additional-layers = Additional Layers\npdfjs-thumb-page-title =\n    .title = Page { $page }\npdfjs-thumb-page-canvas =\n    .aria-label = Thumbnail of Page { $page }\npdfjs-find-input =\n    .title = Find\n    .placeholder = Find in document\u2026\npdfjs-find-previous-button =\n    .title = Find the previous occurrence of the phrase\npdfjs-find-previous-button-label = Previous\npdfjs-find-next-button =\n    .title = Find the next occurrence of the phrase\npdfjs-find-next-button-label = Next\npdfjs-find-highlight-checkbox = Highlight All\npdfjs-find-match-case-checkbox-label = Match Case\npdfjs-find-match-diacritics-checkbox-label = Match Diacritics\npdfjs-find-entire-word-checkbox-label = Whole Words\npdfjs-find-reached-top = Reached top of document, continued from bottom\npdfjs-find-reached-bottom = Reached end of document, continued from top\npdfjs-find-match-count =\n    { $total ->\n        [one] { $current } of { $total } match\n       *[other] { $current } of { $total } matches\n    }\npdfjs-find-match-count-limit =\n    { $limit ->\n        [one] More than { $limit } match\n       *[other] More than { $limit } matches\n    }\npdfjs-find-not-found = Phrase not found\npdfjs-page-scale-width = Page Width\npdfjs-page-scale-fit = Page Fit\npdfjs-page-scale-auto = Automatic Zoom\npdfjs-page-scale-actual = Actual Size\npdfjs-page-scale-percent = { $scale }%\npdfjs-page-landmark =\n    .aria-label = Page { $page }\npdfjs-loading-error = An error occurred while loading the PDF.\npdfjs-invalid-file-error = Invalid or corrupted PDF file.\npdfjs-missing-file-error = Missing PDF file.\npdfjs-unexpected-response-error = Unexpected server response.\npdfjs-rendering-error = An error occurred while rendering the page.\npdfjs-annotation-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }\npdfjs-text-annotation-type =\n    .alt = [{ $type } Annotation]\npdfjs-password-label = Enter the password to open this PDF file.\npdfjs-password-invalid = Invalid password. Please try again.\npdfjs-password-ok-button = OK\npdfjs-password-cancel-button = Cancel\npdfjs-web-fonts-disabled = Web fonts are disabled: unable to use embedded PDF fonts.\npdfjs-editor-free-text-button =\n    .title = Text\npdfjs-editor-free-text-button-label = Text\npdfjs-editor-ink-button =\n    .title = Draw\npdfjs-editor-ink-button-label = Draw\npdfjs-editor-stamp-button =\n    .title = Add or edit images\npdfjs-editor-stamp-button-label = Add or edit images\npdfjs-editor-highlight-button =\n    .title = Highlight\npdfjs-editor-highlight-button-label = Highlight\npdfjs-highlight-floating-button1 =\n    .title = Highlight\n    .aria-label = Highlight\npdfjs-highlight-floating-button-label = Highlight\npdfjs-editor-remove-ink-button =\n    .title = Remove drawing\npdfjs-editor-remove-freetext-button =\n    .title = Remove text\npdfjs-editor-remove-stamp-button =\n    .title = Remove image\npdfjs-editor-remove-highlight-button =\n    .title = Remove highlight\npdfjs-editor-free-text-color-input = Color\npdfjs-editor-free-text-size-input = Size\npdfjs-editor-ink-color-input = Color\npdfjs-editor-ink-thickness-input = Thickness\npdfjs-editor-ink-opacity-input = Opacity\npdfjs-editor-stamp-add-image-button =\n    .title = Add image\npdfjs-editor-stamp-add-image-button-label = Add image\npdfjs-editor-free-highlight-thickness-input = Thickness\npdfjs-editor-free-highlight-thickness-title =\n    .title = Change thickness when highlighting items other than text\npdfjs-free-text2 =\n    .aria-label = Text Editor\n    .default-content = Start typing\u2026\npdfjs-ink =\n    .aria-label = Draw Editor\npdfjs-ink-canvas =\n    .aria-label = User-created image\npdfjs-editor-alt-text-button =\n    .aria-label = Alt text\npdfjs-editor-alt-text-button-label = Alt text\npdfjs-editor-alt-text-edit-button =\n    .aria-label = Edit alt text\npdfjs-editor-alt-text-dialog-label = Choose an option\npdfjs-editor-alt-text-dialog-description = Alt text (alternative text) helps when people can\u2019t see the image or when it doesn\u2019t load.\npdfjs-editor-alt-text-add-description-label = Add a description\npdfjs-editor-alt-text-add-description-description = Aim for 1-2 sentences that describe the subject, setting, or actions.\npdfjs-editor-alt-text-mark-decorative-label = Mark as decorative\npdfjs-editor-alt-text-mark-decorative-description = This is used for ornamental images, like borders or watermarks.\npdfjs-editor-alt-text-cancel-button = Cancel\npdfjs-editor-alt-text-save-button = Save\npdfjs-editor-alt-text-decorative-tooltip = Marked as decorative\npdfjs-editor-alt-text-textarea =\n    .placeholder = For example, \u201CA young man sits down at a table to eat a meal\u201D\npdfjs-editor-resizer-top-left =\n    .aria-label = Top left corner \u2014 resize\npdfjs-editor-resizer-top-middle =\n    .aria-label = Top middle \u2014 resize\npdfjs-editor-resizer-top-right =\n    .aria-label = Top right corner \u2014 resize\npdfjs-editor-resizer-middle-right =\n    .aria-label = Middle right \u2014 resize\npdfjs-editor-resizer-bottom-right =\n    .aria-label = Bottom right corner \u2014 resize\npdfjs-editor-resizer-bottom-middle =\n    .aria-label = Bottom middle \u2014 resize\npdfjs-editor-resizer-bottom-left =\n    .aria-label = Bottom left corner \u2014 resize\npdfjs-editor-resizer-middle-left =\n    .aria-label = Middle left \u2014 resize\npdfjs-editor-highlight-colorpicker-label = Highlight color\npdfjs-editor-colorpicker-button =\n    .title = Change color\npdfjs-editor-colorpicker-dropdown =\n    .aria-label = Color choices\npdfjs-editor-colorpicker-yellow =\n    .title = Yellow\npdfjs-editor-colorpicker-green =\n    .title = Green\npdfjs-editor-colorpicker-blue =\n    .title = Blue\npdfjs-editor-colorpicker-pink =\n    .title = Pink\npdfjs-editor-colorpicker-red =\n    .title = Red\npdfjs-editor-highlight-show-all-button-label = Show all\npdfjs-editor-highlight-show-all-button =\n    .title = Show all\npdfjs-editor-new-alt-text-dialog-edit-label = Edit alt text (image description)\npdfjs-editor-new-alt-text-dialog-add-label = Add alt text (image description)\npdfjs-editor-new-alt-text-textarea =\n    .placeholder = Write your description here\u2026\npdfjs-editor-new-alt-text-description = Short description for people who can\u2019t see the image or when the image doesn\u2019t load.\npdfjs-editor-new-alt-text-disclaimer1 = This alt text was created automatically and may be inaccurate.\npdfjs-editor-new-alt-text-disclaimer-learn-more-url = Learn more\npdfjs-editor-new-alt-text-create-automatically-button-label = Create alt text automatically\npdfjs-editor-new-alt-text-not-now-button = Not now\npdfjs-editor-new-alt-text-error-title = Couldn\u2019t create alt text automatically\npdfjs-editor-new-alt-text-error-description = Please write your own alt text or try again later.\npdfjs-editor-new-alt-text-error-close-button = Close\npdfjs-editor-new-alt-text-ai-model-downloading-progress = Downloading alt text AI model ({ $downloadedSize } of { $totalSize } MB)\n    .aria-valuetext = Downloading alt text AI model ({ $downloadedSize } of { $totalSize } MB)\npdfjs-editor-new-alt-text-added-button =\n    .aria-label = Alt text added\npdfjs-editor-new-alt-text-added-button-label = Alt text added\npdfjs-editor-new-alt-text-missing-button =\n    .aria-label = Missing alt text\npdfjs-editor-new-alt-text-missing-button-label = Missing alt text\npdfjs-editor-new-alt-text-to-review-button =\n    .aria-label = Review alt text\npdfjs-editor-new-alt-text-to-review-button-label = Review alt text\npdfjs-editor-new-alt-text-generated-alt-text-with-disclaimer = Created automatically: { $generatedAltText }\npdfjs-image-alt-text-settings-button =\n    .title = Image alt text settings\npdfjs-image-alt-text-settings-button-label = Image alt text settings\npdfjs-editor-alt-text-settings-dialog-label = Image alt text settings\npdfjs-editor-alt-text-settings-automatic-title = Automatic alt text\npdfjs-editor-alt-text-settings-create-model-button-label = Create alt text automatically\npdfjs-editor-alt-text-settings-create-model-description = Suggests descriptions to help people who can\u2019t see the image or when the image doesn\u2019t load.\npdfjs-editor-alt-text-settings-download-model-label = Alt text AI model ({ $totalSize } MB)\npdfjs-editor-alt-text-settings-ai-model-description = Runs locally on your device so your data stays private. Required for automatic alt text.\npdfjs-editor-alt-text-settings-delete-model-button = Delete\npdfjs-editor-alt-text-settings-download-model-button = Download\npdfjs-editor-alt-text-settings-downloading-model-button = Downloading\u2026\npdfjs-editor-alt-text-settings-editor-title = Alt text editor\npdfjs-editor-alt-text-settings-show-dialog-button-label = Show alt text editor right away when adding an image\npdfjs-editor-alt-text-settings-show-dialog-description = Helps you make sure all your images have alt text.\npdfjs-editor-alt-text-settings-close-button = Close\npdfjs-editor-undo-bar-message-highlight = Highlight removed\npdfjs-editor-undo-bar-message-freetext = Text removed\npdfjs-editor-undo-bar-message-ink = Drawing removed\npdfjs-editor-undo-bar-message-stamp = Image removed\npdfjs-editor-undo-bar-message-multiple =\n    { $count ->\n        [one] { $count } annotation removed\n       *[other] { $count } annotations removed\n    }\npdfjs-editor-undo-bar-undo-button =\n    .title = Undo\npdfjs-editor-undo-bar-undo-button-label = Undo\npdfjs-editor-undo-bar-close-button =\n    .title = Close\npdfjs-editor-undo-bar-close-button-label = Close';
  return createBundle(lang, text);
};
__privateAdd(_genericl10n_GenericL10n, _genericl10n_GenericL10n_static);
let genericl10n_GenericL10n = _genericl10n_GenericL10n;
;
async function docProperties(pdfDocument) {
  const url = "", baseUrl = url.split("#", 1)[0];
  let {
    info,
    metadata,
    contentDispositionFilename,
    contentLength
  } = await pdfDocument.getMetadata();
  if (!contentLength) {
    const {
      length
    } = await pdfDocument.getDownloadInfo();
    contentLength = length;
  }
  return {
    ...info,
    baseURL: baseUrl,
    filesize: contentLength,
    filename: contentDispositionFilename || getPdfFilenameFromUrl(url),
    metadata: metadata == null ? void 0 : metadata.getRaw(),
    authors: metadata == null ? void 0 : metadata.get("dc:creator"),
    numPages: pdfDocument.numPages,
    URL: url
  };
}
;
function initCom(app) {
}
class Preferences extends BasePreferences {
  async _writeToStorage(prefObj) {
    localStorage.setItem("pdfjs.preferences", JSON.stringify(prefObj));
  }
  async _readFromStorage(prefObj) {
    return {
      prefs: JSON.parse(localStorage.getItem("pdfjs.preferences"))
    };
  }
}
class ExternalServices extends BaseExternalServices {
  async createL10n() {
    var _a2;
    return new genericl10n_GenericL10n((_a2 = AppOptions.get("localeProperties")) == null ? void 0 : _a2.lang);
  }
  createScripting() {
    throw new Error("PDF scripting is disabled.");
  }
}
class MLManager {
  async isEnabledFor(_name) {
    return false;
  }
  async deleteModel(_service) {
    return null;
  }
  isReady(_name) {
    return false;
  }
  guess(_data) {
  }
  toggleService(_name, _enabled2) {
  }
  static getFakeMLManager(options) {
    return new FakeMLManager(options);
  }
}
class FakeMLManager {
  eventBus = null;
  hasProgress = false;
  constructor({
    enableGuessAltText,
    enableAltTextModelDownload
  }) {
    this.enableGuessAltText = enableGuessAltText;
    this.enableAltTextModelDownload = enableAltTextModelDownload;
  }
  setEventBus(eventBus, abortSignal) {
    this.eventBus = eventBus;
  }
  async isEnabledFor(_name) {
    return this.enableGuessAltText;
  }
  async deleteModel(_name) {
    this.enableAltTextModelDownload = false;
    return null;
  }
  async loadModel(_name) {
  }
  async downloadModel(_name) {
    this.hasProgress = true;
    const {
      promise,
      resolve
    } = Promise.withResolvers();
    const total = 1e8;
    const end = 1.5 * total;
    const increment = 5e6;
    let loaded = 0;
    const id = setInterval(() => {
      loaded += increment;
      if (loaded <= end) {
        this.eventBus.dispatch("loadaiengineprogress", {
          source: this,
          detail: {
            total,
            totalLoaded: loaded,
            finished: loaded + increment >= end
          }
        });
        return;
      }
      clearInterval(id);
      this.hasProgress = false;
      this.enableAltTextModelDownload = true;
      resolve(true);
    }, 900);
    return promise;
  }
  isReady(_name) {
    return this.enableAltTextModelDownload;
  }
  guess({
    request: {
      data
    }
  }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data ? {
          output: "Fake alt text."
        } : {
          error: true
        });
      }, 3e3);
    });
  }
  toggleService(_name, enabled) {
    this.enableGuessAltText = enabled;
  }
}
;
class NewAltTextManager {
  constructor({
    descriptionContainer,
    dialog: dialog2,
    imagePreview,
    cancelButton,
    disclaimer,
    notNowButton,
    saveButton,
    textarea,
    learnMore,
    errorCloseButton,
    createAutomaticallyButton,
    downloadModel,
    downloadModelDescription,
    title
  }, overlayManager2, eventBus) {
    __privateAdd(this, _NewAltTextManager_instances);
    __privateAdd(this, _boundCancel, __privateMethod(this, _NewAltTextManager_instances, cancel_fn).bind(this));
    __privateAdd(this, _createAutomaticallyButton);
    __privateAdd(this, _currentEditor, null);
    __privateAdd(this, _cancelButton);
    __privateAdd(this, _descriptionContainer);
    __privateAdd(this, _dialog);
    __privateAdd(this, _disclaimer);
    __privateAdd(this, _downloadModel);
    __privateAdd(this, _downloadModelDescription);
    __privateAdd(this, _eventBus);
    __privateAdd(this, _firstTime, false);
    __privateAdd(this, _guessedAltText);
    __privateAdd(this, _hasAI, null);
    __privateAdd(this, _isEditing, null);
    __privateAdd(this, _imagePreview);
    __privateAdd(this, _imageData);
    __privateAdd(this, _isAILoading, false);
    __privateAdd(this, _wasAILoading, false);
    __privateAdd(this, _learnMore);
    __privateAdd(this, _notNowButton);
    __privateAdd(this, _overlayManager);
    __privateAdd(this, _textarea);
    __privateAdd(this, _title);
    __privateAdd(this, _uiManager);
    __privateAdd(this, _previousAltText, null);
    __privateSet(this, _cancelButton, cancelButton);
    __privateSet(this, _createAutomaticallyButton, createAutomaticallyButton);
    __privateSet(this, _descriptionContainer, descriptionContainer);
    __privateSet(this, _dialog, dialog2);
    __privateSet(this, _disclaimer, disclaimer);
    __privateSet(this, _notNowButton, notNowButton);
    __privateSet(this, _imagePreview, imagePreview);
    __privateSet(this, _textarea, textarea);
    __privateSet(this, _learnMore, learnMore);
    __privateSet(this, _title, title);
    __privateSet(this, _downloadModel, downloadModel);
    __privateSet(this, _downloadModelDescription, downloadModelDescription);
    __privateSet(this, _overlayManager, overlayManager2);
    __privateSet(this, _eventBus, eventBus);
    dialog2.addEventListener("close", __privateMethod(this, _NewAltTextManager_instances, close_fn).bind(this));
    dialog2.addEventListener("contextmenu", (event) => {
      if (event.target !== __privateGet(this, _textarea)) {
        event.preventDefault();
      }
    });
    cancelButton.addEventListener("click", __privateGet(this, _boundCancel));
    notNowButton.addEventListener("click", __privateGet(this, _boundCancel));
    saveButton.addEventListener("click", __privateMethod(this, _NewAltTextManager_instances, save_fn).bind(this));
    errorCloseButton.addEventListener("click", () => {
      __privateMethod(this, _NewAltTextManager_instances, toggleError_fn).call(this, false);
    });
    createAutomaticallyButton.addEventListener("click", async () => {
      const checked = createAutomaticallyButton.getAttribute("aria-pressed") !== "true";
      __privateGet(this, _currentEditor)._reportTelemetry({
        action: "pdfjs.image.alt_text.ai_generation_check",
        data: {
          status: checked
        }
      });
      if (__privateGet(this, _uiManager)) {
        __privateGet(this, _uiManager).setPreference("enableGuessAltText", checked);
        await __privateGet(this, _uiManager).mlManager.toggleService("altText", checked);
      }
      __privateMethod(this, _NewAltTextManager_instances, toggleGuessAltText_fn).call(this, checked, false);
    });
    textarea.addEventListener("focus", () => {
      __privateSet(this, _wasAILoading, __privateGet(this, _isAILoading));
      __privateMethod(this, _NewAltTextManager_instances, toggleLoading_fn).call(this, false);
      __privateMethod(this, _NewAltTextManager_instances, toggleTitleAndDisclaimer_fn).call(this);
    });
    textarea.addEventListener("blur", () => {
      if (!textarea.value) {
        __privateMethod(this, _NewAltTextManager_instances, toggleLoading_fn).call(this, __privateGet(this, _wasAILoading));
      }
      __privateMethod(this, _NewAltTextManager_instances, toggleTitleAndDisclaimer_fn).call(this);
    });
    textarea.addEventListener("input", () => {
      __privateMethod(this, _NewAltTextManager_instances, toggleTitleAndDisclaimer_fn).call(this);
    });
    eventBus._on("enableguessalttext", ({
      value
    }) => {
      __privateMethod(this, _NewAltTextManager_instances, toggleGuessAltText_fn).call(this, value, false);
    });
    __privateGet(this, _overlayManager).register(dialog2);
    __privateGet(this, _learnMore).addEventListener("click", () => {
      __privateGet(this, _currentEditor)._reportTelemetry({
        action: "pdfjs.image.alt_text.info",
        data: {
          topic: "alt_text"
        }
      });
    });
  }
  async editAltText(uiManager, editor, firstTime) {
    var _a2;
    if (__privateGet(this, _currentEditor) || !editor) {
      return;
    }
    if (firstTime && editor.hasAltTextData()) {
      editor.altTextFinish();
      return;
    }
    __privateSet(this, _firstTime, firstTime);
    let {
      mlManager
    } = uiManager;
    let hasAI = !!mlManager;
    __privateMethod(this, _NewAltTextManager_instances, toggleTitleAndDisclaimer_fn).call(this);
    if (mlManager && !mlManager.isReady("altText")) {
      hasAI = false;
      if (mlManager.hasProgress) {
        __privateMethod(this, _NewAltTextManager_instances, setProgress_fn).call(this);
      } else {
        mlManager = null;
      }
    } else {
      __privateGet(this, _downloadModel).classList.toggle("hidden", true);
    }
    const isAltTextEnabledPromise = mlManager == null ? void 0 : mlManager.isEnabledFor("altText");
    __privateSet(this, _currentEditor, editor);
    __privateSet(this, _uiManager, uiManager);
    __privateGet(this, _uiManager).removeEditListeners();
    ({
      altText: __privateWrapper(this, _previousAltText)._
    } = editor.altTextData);
    __privateGet(this, _textarea).value = (_a2 = __privateGet(this, _previousAltText)) != null ? _a2 : "";
    const AI_MAX_IMAGE_DIMENSION = 224;
    const MAX_PREVIEW_DIMENSION = 180;
    let canvas, width, height;
    if (mlManager) {
      ({
        canvas,
        width,
        height,
        imageData: __privateWrapper(this, _imageData)._
      } = editor.copyCanvas(AI_MAX_IMAGE_DIMENSION, MAX_PREVIEW_DIMENSION, true));
      if (hasAI) {
        __privateMethod(this, _NewAltTextManager_instances, toggleGuessAltText_fn).call(this, await isAltTextEnabledPromise, true);
      }
    } else {
      ({
        canvas,
        width,
        height
      } = editor.copyCanvas(AI_MAX_IMAGE_DIMENSION, MAX_PREVIEW_DIMENSION, false));
    }
    canvas.setAttribute("role", "presentation");
    const {
      style
    } = canvas;
    style.width = `${width}px`;
    style.height = `${height}px`;
    __privateGet(this, _imagePreview).append(canvas);
    __privateMethod(this, _NewAltTextManager_instances, toggleNotNow_fn).call(this);
    __privateMethod(this, _NewAltTextManager_instances, toggleAI_fn).call(this, hasAI);
    __privateMethod(this, _NewAltTextManager_instances, toggleError_fn).call(this, false);
    try {
      await __privateGet(this, _overlayManager).open(__privateGet(this, _dialog));
    } catch (ex) {
      __privateMethod(this, _NewAltTextManager_instances, close_fn).call(this);
      throw ex;
    }
  }
  destroy() {
    __privateSet(this, _uiManager, null);
    __privateMethod(this, _NewAltTextManager_instances, finish_fn).call(this);
  }
}
_boundCancel = new WeakMap();
_createAutomaticallyButton = new WeakMap();
_currentEditor = new WeakMap();
_cancelButton = new WeakMap();
_descriptionContainer = new WeakMap();
_dialog = new WeakMap();
_disclaimer = new WeakMap();
_downloadModel = new WeakMap();
_downloadModelDescription = new WeakMap();
_eventBus = new WeakMap();
_firstTime = new WeakMap();
_guessedAltText = new WeakMap();
_hasAI = new WeakMap();
_isEditing = new WeakMap();
_imagePreview = new WeakMap();
_imageData = new WeakMap();
_isAILoading = new WeakMap();
_wasAILoading = new WeakMap();
_learnMore = new WeakMap();
_notNowButton = new WeakMap();
_overlayManager = new WeakMap();
_textarea = new WeakMap();
_title = new WeakMap();
_uiManager = new WeakMap();
_previousAltText = new WeakMap();
_NewAltTextManager_instances = new WeakSet();
toggleLoading_fn = function(value) {
  if (!__privateGet(this, _uiManager) || __privateGet(this, _isAILoading) === value) {
    return;
  }
  __privateSet(this, _isAILoading, value);
  __privateGet(this, _descriptionContainer).classList.toggle("loading", value);
};
toggleError_fn = function(value) {
  if (!__privateGet(this, _uiManager)) {
    return;
  }
  __privateGet(this, _dialog).classList.toggle("error", value);
};
toggleGuessAltText_fn = async function(value, isInitial = false) {
  if (!__privateGet(this, _uiManager)) {
    return;
  }
  __privateGet(this, _dialog).classList.toggle("aiDisabled", !value);
  __privateGet(this, _createAutomaticallyButton).setAttribute("aria-pressed", value);
  if (value) {
    const {
      altTextLearnMoreUrl
    } = __privateGet(this, _uiManager).mlManager;
    if (altTextLearnMoreUrl) {
      __privateGet(this, _learnMore).href = altTextLearnMoreUrl;
    }
    __privateMethod(this, _NewAltTextManager_instances, mlGuessAltText_fn).call(this, isInitial);
  } else {
    __privateMethod(this, _NewAltTextManager_instances, toggleLoading_fn).call(this, false);
    __privateSet(this, _isAILoading, false);
    __privateMethod(this, _NewAltTextManager_instances, toggleTitleAndDisclaimer_fn).call(this);
  }
};
toggleNotNow_fn = function() {
  __privateGet(this, _notNowButton).classList.toggle("hidden", !__privateGet(this, _firstTime));
  __privateGet(this, _cancelButton).classList.toggle("hidden", __privateGet(this, _firstTime));
};
toggleAI_fn = function(value) {
  if (!__privateGet(this, _uiManager) || __privateGet(this, _hasAI) === value) {
    return;
  }
  __privateSet(this, _hasAI, value);
  __privateGet(this, _dialog).classList.toggle("noAi", !value);
  __privateMethod(this, _NewAltTextManager_instances, toggleTitleAndDisclaimer_fn).call(this);
};
toggleTitleAndDisclaimer_fn = function() {
  const visible = __privateGet(this, _isAILoading) || __privateGet(this, _guessedAltText) && __privateGet(this, _guessedAltText) === __privateGet(this, _textarea).value;
  __privateGet(this, _disclaimer).hidden = !visible;
  const isEditing = __privateGet(this, _isAILoading) || !!__privateGet(this, _textarea).value;
  if (__privateGet(this, _isEditing) === isEditing) {
    return;
  }
  __privateSet(this, _isEditing, isEditing);
  __privateGet(this, _title).setAttribute("data-l10n-id", isEditing ? "pdfjs-editor-new-alt-text-dialog-edit-label" : "pdfjs-editor-new-alt-text-dialog-add-label");
};
mlGuessAltText_fn = async function(isInitial) {
  if (__privateGet(this, _isAILoading)) {
    return;
  }
  if (__privateGet(this, _textarea).value) {
    return;
  }
  if (isInitial && __privateGet(this, _previousAltText) !== null) {
    return;
  }
  __privateSet(this, _guessedAltText, __privateGet(this, _currentEditor).guessedAltText);
  if (__privateGet(this, _previousAltText) === null && __privateGet(this, _guessedAltText)) {
    __privateMethod(this, _NewAltTextManager_instances, addAltText_fn).call(this, __privateGet(this, _guessedAltText));
    return;
  }
  __privateMethod(this, _NewAltTextManager_instances, toggleLoading_fn).call(this, true);
  __privateMethod(this, _NewAltTextManager_instances, toggleTitleAndDisclaimer_fn).call(this);
  let hasError = false;
  try {
    const altText = await __privateGet(this, _currentEditor).mlGuessAltText(__privateGet(this, _imageData), false);
    if (altText) {
      __privateSet(this, _guessedAltText, altText);
      __privateSet(this, _wasAILoading, __privateGet(this, _isAILoading));
      if (__privateGet(this, _isAILoading)) {
        __privateMethod(this, _NewAltTextManager_instances, addAltText_fn).call(this, altText);
      }
    }
  } catch (e) {
    console.error(e);
    hasError = true;
  }
  __privateMethod(this, _NewAltTextManager_instances, toggleLoading_fn).call(this, false);
  __privateMethod(this, _NewAltTextManager_instances, toggleTitleAndDisclaimer_fn).call(this);
  if (hasError && __privateGet(this, _uiManager)) {
    __privateMethod(this, _NewAltTextManager_instances, toggleError_fn).call(this, true);
  }
};
addAltText_fn = function(altText) {
  if (!__privateGet(this, _uiManager) || __privateGet(this, _textarea).value) {
    return;
  }
  __privateGet(this, _textarea).value = altText;
  __privateMethod(this, _NewAltTextManager_instances, toggleTitleAndDisclaimer_fn).call(this);
};
setProgress_fn = function() {
  __privateGet(this, _downloadModel).classList.toggle("hidden", false);
  const callback = async ({
    detail: {
      finished,
      total,
      totalLoaded
    }
  }) => {
    const ONE_MEGA_BYTES = 1e6;
    totalLoaded = Math.min(0.99 * total, totalLoaded);
    const totalSize = __privateGet(this, _downloadModelDescription).ariaValueMax = Math.round(total / ONE_MEGA_BYTES);
    const downloadedSize = __privateGet(this, _downloadModelDescription).ariaValueNow = Math.round(totalLoaded / ONE_MEGA_BYTES);
    __privateGet(this, _downloadModelDescription).setAttribute("data-l10n-args", JSON.stringify({
      totalSize,
      downloadedSize
    }));
    if (!finished) {
      return;
    }
    __privateGet(this, _eventBus)._off("loadaiengineprogress", callback);
    __privateGet(this, _downloadModel).classList.toggle("hidden", true);
    __privateMethod(this, _NewAltTextManager_instances, toggleAI_fn).call(this, true);
    if (!__privateGet(this, _uiManager)) {
      return;
    }
    const {
      mlManager
    } = __privateGet(this, _uiManager);
    mlManager.toggleService("altText", true);
    __privateMethod(this, _NewAltTextManager_instances, toggleGuessAltText_fn).call(this, await mlManager.isEnabledFor("altText"), true);
  };
  __privateGet(this, _eventBus)._on("loadaiengineprogress", callback);
};
cancel_fn = function() {
  __privateGet(this, _currentEditor).altTextData = {
    cancel: true
  };
  const altText = __privateGet(this, _textarea).value.trim();
  __privateGet(this, _currentEditor)._reportTelemetry({
    action: "pdfjs.image.alt_text.dismiss",
    data: {
      alt_text_type: altText ? "present" : "empty",
      flow: __privateGet(this, _firstTime) ? "image_add" : "alt_text_edit"
    }
  });
  __privateGet(this, _currentEditor)._reportTelemetry({
    action: "pdfjs.image.image_added",
    data: {
      alt_text_modal: true,
      alt_text_type: "skipped"
    }
  });
  __privateMethod(this, _NewAltTextManager_instances, finish_fn).call(this);
};
finish_fn = function() {
  if (__privateGet(this, _overlayManager).active === __privateGet(this, _dialog)) {
    __privateGet(this, _overlayManager).close(__privateGet(this, _dialog));
  }
};
close_fn = function() {
  var _a2, _b;
  const canvas = __privateGet(this, _imagePreview).firstChild;
  canvas.remove();
  canvas.width = canvas.height = 0;
  __privateSet(this, _imageData, null);
  __privateMethod(this, _NewAltTextManager_instances, toggleLoading_fn).call(this, false);
  (_a2 = __privateGet(this, _uiManager)) == null ? void 0 : _a2.addEditListeners();
  __privateGet(this, _currentEditor).altTextFinish();
  (_b = __privateGet(this, _uiManager)) == null ? void 0 : _b.setSelected(__privateGet(this, _currentEditor));
  __privateSet(this, _currentEditor, null);
  __privateSet(this, _uiManager, null);
};
extractWords_fn = function(text) {
  return new Set(text.toLowerCase().split(/[^\p{L}\p{N}]+/gu).filter((x) => !!x));
};
save_fn = function() {
  const altText = __privateGet(this, _textarea).value.trim();
  __privateGet(this, _currentEditor).altTextData = {
    altText,
    decorative: false
  };
  __privateGet(this, _currentEditor).altTextData.guessedAltText = __privateGet(this, _guessedAltText);
  if (__privateGet(this, _guessedAltText) && __privateGet(this, _guessedAltText) !== altText) {
    const guessedWords = __privateMethod(this, _NewAltTextManager_instances, extractWords_fn).call(this, __privateGet(this, _guessedAltText));
    const words = __privateMethod(this, _NewAltTextManager_instances, extractWords_fn).call(this, altText);
    __privateGet(this, _currentEditor)._reportTelemetry({
      action: "pdfjs.image.alt_text.user_edit",
      data: {
        total_words: guessedWords.size,
        words_removed: guessedWords.difference(words).size,
        words_added: words.difference(guessedWords).size
      }
    });
  }
  __privateGet(this, _currentEditor)._reportTelemetry({
    action: "pdfjs.image.image_added",
    data: {
      alt_text_modal: true,
      alt_text_type: altText ? "present" : "empty"
    }
  });
  __privateGet(this, _currentEditor)._reportTelemetry({
    action: "pdfjs.image.alt_text.save",
    data: {
      alt_text_type: altText ? "present" : "empty",
      flow: __privateGet(this, _firstTime) ? "image_add" : "alt_text_edit"
    }
  });
  __privateMethod(this, _NewAltTextManager_instances, finish_fn).call(this);
};
class ImageAltTextSettings {
  constructor({
    dialog: dialog2,
    createModelButton,
    aiModelSettings,
    learnMore,
    closeButton,
    deleteModelButton,
    downloadModelButton,
    showAltTextDialogButton
  }, overlayManager2, eventBus, mlManager) {
    __privateAdd(this, _ImageAltTextSettings_instances);
    __privateAdd(this, _aiModelSettings);
    __privateAdd(this, _createModelButton);
    __privateAdd(this, _downloadModelButton);
    __privateAdd(this, _dialog2);
    __privateAdd(this, _eventBus2);
    __privateAdd(this, _mlManager);
    __privateAdd(this, _overlayManager2);
    __privateAdd(this, _showAltTextDialogButton);
    __privateSet(this, _dialog2, dialog2);
    __privateSet(this, _aiModelSettings, aiModelSettings);
    __privateSet(this, _createModelButton, createModelButton);
    __privateSet(this, _downloadModelButton, downloadModelButton);
    __privateSet(this, _showAltTextDialogButton, showAltTextDialogButton);
    __privateSet(this, _overlayManager2, overlayManager2);
    __privateSet(this, _eventBus2, eventBus);
    __privateSet(this, _mlManager, mlManager);
    const {
      altTextLearnMoreUrl
    } = mlManager;
    if (altTextLearnMoreUrl) {
      learnMore.href = altTextLearnMoreUrl;
    }
    dialog2.addEventListener("contextmenu", noContextMenu);
    createModelButton.addEventListener("click", async (e) => {
      const checked = __privateMethod(this, _ImageAltTextSettings_instances, togglePref_fn).call(this, "enableGuessAltText", e);
      await mlManager.toggleService("altText", checked);
      __privateMethod(this, _ImageAltTextSettings_instances, reportTelemetry_fn).call(this, {
        type: "stamp",
        action: "pdfjs.image.alt_text.settings_ai_generation_check",
        data: {
          status: checked
        }
      });
    });
    showAltTextDialogButton.addEventListener("click", (e) => {
      const checked = __privateMethod(this, _ImageAltTextSettings_instances, togglePref_fn).call(this, "enableNewAltTextWhenAddingImage", e);
      __privateMethod(this, _ImageAltTextSettings_instances, reportTelemetry_fn).call(this, {
        type: "stamp",
        action: "pdfjs.image.alt_text.settings_edit_alt_text_check",
        data: {
          status: checked
        }
      });
    });
    deleteModelButton.addEventListener("click", __privateMethod(this, _ImageAltTextSettings_instances, delete_fn).bind(this, true));
    downloadModelButton.addEventListener("click", __privateMethod(this, _ImageAltTextSettings_instances, download_fn).bind(this, true));
    closeButton.addEventListener("click", __privateMethod(this, _ImageAltTextSettings_instances, finish_fn2).bind(this));
    learnMore.addEventListener("click", () => {
      __privateMethod(this, _ImageAltTextSettings_instances, reportTelemetry_fn).call(this, {
        type: "stamp",
        action: "pdfjs.image.alt_text.info",
        data: {
          topic: "ai_generation"
        }
      });
    });
    eventBus._on("enablealttextmodeldownload", ({
      value
    }) => {
      if (value) {
        __privateMethod(this, _ImageAltTextSettings_instances, download_fn).call(this, false);
      } else {
        __privateMethod(this, _ImageAltTextSettings_instances, delete_fn).call(this, false);
      }
    });
    __privateGet(this, _overlayManager2).register(dialog2);
  }
  async open({
    enableGuessAltText,
    enableNewAltTextWhenAddingImage
  }) {
    const {
      enableAltTextModelDownload
    } = __privateGet(this, _mlManager);
    __privateGet(this, _createModelButton).disabled = !enableAltTextModelDownload;
    __privateGet(this, _createModelButton).setAttribute("aria-pressed", enableAltTextModelDownload && enableGuessAltText);
    __privateGet(this, _showAltTextDialogButton).setAttribute("aria-pressed", enableNewAltTextWhenAddingImage);
    __privateGet(this, _aiModelSettings).classList.toggle("download", !enableAltTextModelDownload);
    await __privateGet(this, _overlayManager2).open(__privateGet(this, _dialog2));
    __privateMethod(this, _ImageAltTextSettings_instances, reportTelemetry_fn).call(this, {
      type: "stamp",
      action: "pdfjs.image.alt_text.settings_displayed"
    });
  }
}
_aiModelSettings = new WeakMap();
_createModelButton = new WeakMap();
_downloadModelButton = new WeakMap();
_dialog2 = new WeakMap();
_eventBus2 = new WeakMap();
_mlManager = new WeakMap();
_overlayManager2 = new WeakMap();
_showAltTextDialogButton = new WeakMap();
_ImageAltTextSettings_instances = new WeakSet();
reportTelemetry_fn = function(data) {
  __privateGet(this, _eventBus2).dispatch("reporttelemetry", {
    source: this,
    details: {
      type: "editing",
      data
    }
  });
};
download_fn = async function(isFromUI = false) {
  if (isFromUI) {
    __privateGet(this, _downloadModelButton).disabled = true;
    const span = __privateGet(this, _downloadModelButton).firstChild;
    span.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-settings-downloading-model-button");
    await __privateGet(this, _mlManager).downloadModel("altText");
    span.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-settings-download-model-button");
    __privateGet(this, _createModelButton).disabled = false;
    __privateMethod(this, _ImageAltTextSettings_instances, setPref_fn).call(this, "enableGuessAltText", true);
    __privateGet(this, _mlManager).toggleService("altText", true);
    __privateMethod(this, _ImageAltTextSettings_instances, setPref_fn).call(this, "enableAltTextModelDownload", true);
    __privateGet(this, _downloadModelButton).disabled = false;
  }
  __privateGet(this, _aiModelSettings).classList.toggle("download", false);
  __privateGet(this, _createModelButton).setAttribute("aria-pressed", true);
};
delete_fn = async function(isFromUI = false) {
  if (isFromUI) {
    await __privateGet(this, _mlManager).deleteModel("altText");
    __privateMethod(this, _ImageAltTextSettings_instances, setPref_fn).call(this, "enableGuessAltText", false);
    __privateMethod(this, _ImageAltTextSettings_instances, setPref_fn).call(this, "enableAltTextModelDownload", false);
  }
  __privateGet(this, _aiModelSettings).classList.toggle("download", true);
  __privateGet(this, _createModelButton).disabled = true;
  __privateGet(this, _createModelButton).setAttribute("aria-pressed", false);
};
togglePref_fn = function(name, {
  target
}) {
  const checked = target.getAttribute("aria-pressed") !== "true";
  __privateMethod(this, _ImageAltTextSettings_instances, setPref_fn).call(this, name, checked);
  target.setAttribute("aria-pressed", checked);
  return checked;
};
setPref_fn = function(name, value) {
  __privateGet(this, _eventBus2).dispatch("setpreference", {
    source: this,
    name,
    value
  });
};
finish_fn2 = function() {
  if (__privateGet(this, _overlayManager2).active === __privateGet(this, _dialog2)) {
    __privateGet(this, _overlayManager2).close(__privateGet(this, _dialog2));
  }
};
;
class AltTextManager {
  constructor({
    dialog: dialog2,
    optionDescription,
    optionDecorative,
    textarea,
    cancelButton,
    saveButton
  }, container, overlayManager2, eventBus) {
    __privateAdd(this, _AltTextManager_instances);
    __privateAdd(this, _clickAC, null);
    __privateAdd(this, _currentEditor2, null);
    __privateAdd(this, _cancelButton2);
    __privateAdd(this, _dialog3);
    __privateAdd(this, _eventBus3);
    __privateAdd(this, _hasUsedPointer, false);
    __privateAdd(this, _optionDescription);
    __privateAdd(this, _optionDecorative);
    __privateAdd(this, _overlayManager3);
    __privateAdd(this, _saveButton);
    __privateAdd(this, _textarea2);
    __privateAdd(this, _uiManager2);
    __privateAdd(this, _previousAltText2, null);
    __privateAdd(this, _resizeAC, null);
    __privateAdd(this, _svgElement, null);
    __privateAdd(this, _rectElement, null);
    __privateAdd(this, _container);
    __privateAdd(this, _telemetryData, null);
    __privateSet(this, _dialog3, dialog2);
    __privateSet(this, _optionDescription, optionDescription);
    __privateSet(this, _optionDecorative, optionDecorative);
    __privateSet(this, _textarea2, textarea);
    __privateSet(this, _cancelButton2, cancelButton);
    __privateSet(this, _saveButton, saveButton);
    __privateSet(this, _overlayManager3, overlayManager2);
    __privateSet(this, _eventBus3, eventBus);
    __privateSet(this, _container, container);
    const onUpdateUIState = __privateMethod(this, _AltTextManager_instances, updateUIState_fn).bind(this);
    dialog2.addEventListener("close", __privateMethod(this, _AltTextManager_instances, close_fn2).bind(this));
    dialog2.addEventListener("contextmenu", (event) => {
      if (event.target !== __privateGet(this, _textarea2)) {
        event.preventDefault();
      }
    });
    cancelButton.addEventListener("click", __privateMethod(this, _AltTextManager_instances, finish_fn3).bind(this));
    saveButton.addEventListener("click", __privateMethod(this, _AltTextManager_instances, save_fn2).bind(this));
    optionDescription.addEventListener("change", onUpdateUIState);
    optionDecorative.addEventListener("change", onUpdateUIState);
    __privateGet(this, _overlayManager3).register(dialog2);
  }
  async editAltText(uiManager, editor) {
    if (__privateGet(this, _currentEditor2) || !editor) {
      return;
    }
    __privateMethod(this, _AltTextManager_instances, createSVGElement_fn).call(this);
    __privateSet(this, _hasUsedPointer, false);
    __privateSet(this, _clickAC, new AbortController());
    const clickOpts = {
      signal: __privateGet(this, _clickAC).signal
    }, onClick2 = __privateMethod(this, _AltTextManager_instances, onClick_fn).bind(this);
    for (const element of [__privateGet(this, _optionDescription), __privateGet(this, _optionDecorative), __privateGet(this, _textarea2), __privateGet(this, _saveButton), __privateGet(this, _cancelButton2)]) {
      element.addEventListener("click", onClick2, clickOpts);
    }
    const {
      altText,
      decorative
    } = editor.altTextData;
    if (decorative === true) {
      __privateGet(this, _optionDecorative).checked = true;
      __privateGet(this, _optionDescription).checked = false;
    } else {
      __privateGet(this, _optionDecorative).checked = false;
      __privateGet(this, _optionDescription).checked = true;
    }
    __privateSet(this, _previousAltText2, __privateGet(this, _textarea2).value = (altText == null ? void 0 : altText.trim()) || "");
    __privateMethod(this, _AltTextManager_instances, updateUIState_fn).call(this);
    __privateSet(this, _currentEditor2, editor);
    __privateSet(this, _uiManager2, uiManager);
    __privateGet(this, _uiManager2).removeEditListeners();
    __privateSet(this, _resizeAC, new AbortController());
    __privateGet(this, _eventBus3)._on("resize", __privateMethod(this, _AltTextManager_instances, setPosition_fn).bind(this), {
      signal: __privateGet(this, _resizeAC).signal
    });
    try {
      await __privateGet(this, _overlayManager3).open(__privateGet(this, _dialog3));
      __privateMethod(this, _AltTextManager_instances, setPosition_fn).call(this);
    } catch (ex) {
      __privateMethod(this, _AltTextManager_instances, close_fn2).call(this);
      throw ex;
    }
  }
  destroy() {
    var _a2;
    __privateSet(this, _uiManager2, null);
    __privateMethod(this, _AltTextManager_instances, finish_fn3).call(this);
    (_a2 = __privateGet(this, _svgElement)) == null ? void 0 : _a2.remove();
    __privateSet(this, _svgElement, __privateSet(this, _rectElement, null));
  }
}
_clickAC = new WeakMap();
_currentEditor2 = new WeakMap();
_cancelButton2 = new WeakMap();
_dialog3 = new WeakMap();
_eventBus3 = new WeakMap();
_hasUsedPointer = new WeakMap();
_optionDescription = new WeakMap();
_optionDecorative = new WeakMap();
_overlayManager3 = new WeakMap();
_saveButton = new WeakMap();
_textarea2 = new WeakMap();
_uiManager2 = new WeakMap();
_previousAltText2 = new WeakMap();
_resizeAC = new WeakMap();
_svgElement = new WeakMap();
_rectElement = new WeakMap();
_container = new WeakMap();
_telemetryData = new WeakMap();
_AltTextManager_instances = new WeakSet();
createSVGElement_fn = function() {
  if (__privateGet(this, _svgElement)) {
    return;
  }
  const svgFactory = new DOMSVGFactory();
  const svg = __privateSet(this, _svgElement, svgFactory.createElement("svg"));
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  const defs = svgFactory.createElement("defs");
  svg.append(defs);
  const mask = svgFactory.createElement("mask");
  defs.append(mask);
  mask.setAttribute("id", "alttext-manager-mask");
  mask.setAttribute("maskContentUnits", "objectBoundingBox");
  let rect = svgFactory.createElement("rect");
  mask.append(rect);
  rect.setAttribute("fill", "white");
  rect.setAttribute("width", "1");
  rect.setAttribute("height", "1");
  rect.setAttribute("x", "0");
  rect.setAttribute("y", "0");
  rect = __privateSet(this, _rectElement, svgFactory.createElement("rect"));
  mask.append(rect);
  rect.setAttribute("fill", "black");
  __privateGet(this, _dialog3).append(svg);
};
setPosition_fn = function() {
  if (!__privateGet(this, _currentEditor2)) {
    return;
  }
  const dialog2 = __privateGet(this, _dialog3);
  const {
    style
  } = dialog2;
  const {
    x: containerX,
    y: containerY,
    width: containerW,
    height: containerH
  } = __privateGet(this, _container).getBoundingClientRect();
  const {
    innerWidth: windowW,
    innerHeight: windowH
  } = window;
  const {
    width: dialogW,
    height: dialogH
  } = dialog2.getBoundingClientRect();
  const {
    x,
    y,
    width,
    height
  } = __privateGet(this, _currentEditor2).getClientDimensions();
  const MARGIN = 10;
  const isLTR = __privateGet(this, _uiManager2).direction === "ltr";
  const xs = Math.max(x, containerX);
  const xe = Math.min(x + width, containerX + containerW);
  const ys = Math.max(y, containerY);
  const ye = Math.min(y + height, containerY + containerH);
  __privateGet(this, _rectElement).setAttribute("width", `${(xe - xs) / windowW}`);
  __privateGet(this, _rectElement).setAttribute("height", `${(ye - ys) / windowH}`);
  __privateGet(this, _rectElement).setAttribute("x", `${xs / windowW}`);
  __privateGet(this, _rectElement).setAttribute("y", `${ys / windowH}`);
  let left = null;
  let top = Math.max(y, 0);
  top += Math.min(windowH - (top + dialogH), 0);
  if (isLTR) {
    if (x + width + MARGIN + dialogW < windowW) {
      left = x + width + MARGIN;
    } else if (x > dialogW + MARGIN) {
      left = x - dialogW - MARGIN;
    }
  } else if (x > dialogW + MARGIN) {
    left = x - dialogW - MARGIN;
  } else if (x + width + MARGIN + dialogW < windowW) {
    left = x + width + MARGIN;
  }
  if (left === null) {
    top = null;
    left = Math.max(x, 0);
    left += Math.min(windowW - (left + dialogW), 0);
    if (y > dialogH + MARGIN) {
      top = y - dialogH - MARGIN;
    } else if (y + height + MARGIN + dialogH < windowH) {
      top = y + height + MARGIN;
    }
  }
  if (top !== null) {
    dialog2.classList.add("positioned");
    if (isLTR) {
      style.left = `${left}px`;
    } else {
      style.right = `${windowW - left - dialogW}px`;
    }
    style.top = `${top}px`;
  } else {
    dialog2.classList.remove("positioned");
    style.left = "";
    style.top = "";
  }
};
finish_fn3 = function() {
  if (__privateGet(this, _overlayManager3).active === __privateGet(this, _dialog3)) {
    __privateGet(this, _overlayManager3).close(__privateGet(this, _dialog3));
  }
};
close_fn2 = function() {
  var _a2, _b;
  __privateGet(this, _currentEditor2)._reportTelemetry(__privateGet(this, _telemetryData) || {
    action: "alt_text_cancel",
    alt_text_keyboard: !__privateGet(this, _hasUsedPointer)
  });
  __privateSet(this, _telemetryData, null);
  __privateMethod(this, _AltTextManager_instances, removeOnClickListeners_fn).call(this);
  (_a2 = __privateGet(this, _uiManager2)) == null ? void 0 : _a2.addEditListeners();
  (_b = __privateGet(this, _resizeAC)) == null ? void 0 : _b.abort();
  __privateSet(this, _resizeAC, null);
  __privateGet(this, _currentEditor2).altTextFinish();
  __privateSet(this, _currentEditor2, null);
  __privateSet(this, _uiManager2, null);
};
updateUIState_fn = function() {
  __privateGet(this, _textarea2).disabled = __privateGet(this, _optionDecorative).checked;
};
save_fn2 = function() {
  const altText = __privateGet(this, _textarea2).value.trim();
  const decorative = __privateGet(this, _optionDecorative).checked;
  __privateGet(this, _currentEditor2).altTextData = {
    altText,
    decorative
  };
  __privateSet(this, _telemetryData, {
    action: "alt_text_save",
    alt_text_description: !!altText,
    alt_text_edit: !!__privateGet(this, _previousAltText2) && __privateGet(this, _previousAltText2) !== altText,
    alt_text_decorative: decorative,
    alt_text_keyboard: !__privateGet(this, _hasUsedPointer)
  });
  __privateMethod(this, _AltTextManager_instances, finish_fn3).call(this);
};
onClick_fn = function(evt) {
  if (evt.detail === 0) {
    return;
  }
  __privateSet(this, _hasUsedPointer, true);
  __privateMethod(this, _AltTextManager_instances, removeOnClickListeners_fn).call(this);
};
removeOnClickListeners_fn = function() {
  var _a2;
  (_a2 = __privateGet(this, _clickAC)) == null ? void 0 : _a2.abort();
  __privateSet(this, _clickAC, null);
};
;
class AnnotationEditorParams {
  constructor(options, eventBus) {
    __privateAdd(this, _AnnotationEditorParams_instances);
    this.eventBus = eventBus;
    __privateMethod(this, _AnnotationEditorParams_instances, bindListeners_fn).call(this, options);
  }
}
_AnnotationEditorParams_instances = new WeakSet();
bindListeners_fn = function({
  editorFreeTextFontSize,
  editorFreeTextColor,
  editorInkColor,
  editorInkThickness,
  editorInkOpacity,
  editorStampAddImage,
  editorFreeHighlightThickness,
  editorHighlightShowAll
}) {
  const dispatchEvent2 = (typeStr, value) => {
    this.eventBus.dispatch("switchannotationeditorparams", {
      source: this,
      type: AnnotationEditorParamsType[typeStr],
      value
    });
  };
  editorFreeTextFontSize.addEventListener("input", function() {
    dispatchEvent2("FREETEXT_SIZE", this.valueAsNumber);
  });
  editorFreeTextColor.addEventListener("input", function() {
    dispatchEvent2("FREETEXT_COLOR", this.value);
  });
  editorInkColor.addEventListener("input", function() {
    dispatchEvent2("INK_COLOR", this.value);
  });
  editorInkThickness.addEventListener("input", function() {
    dispatchEvent2("INK_THICKNESS", this.valueAsNumber);
  });
  editorInkOpacity.addEventListener("input", function() {
    dispatchEvent2("INK_OPACITY", this.valueAsNumber);
  });
  editorStampAddImage.addEventListener("click", () => {
    this.eventBus.dispatch("reporttelemetry", {
      source: this,
      details: {
        type: "editing",
        data: {
          action: "pdfjs.image.add_image_click"
        }
      }
    });
    dispatchEvent2("CREATE");
  });
  editorFreeHighlightThickness.addEventListener("input", function() {
    dispatchEvent2("HIGHLIGHT_THICKNESS", this.valueAsNumber);
  });
  editorHighlightShowAll.addEventListener("click", function() {
    const checked = this.getAttribute("aria-pressed") === "true";
    this.setAttribute("aria-pressed", !checked);
    dispatchEvent2("HIGHLIGHT_SHOW_ALL", !checked);
  });
  this.eventBus._on("annotationeditorparamschanged", (evt) => {
    for (const [type, value] of evt.details) {
      switch (type) {
        case AnnotationEditorParamsType.FREETEXT_SIZE:
          editorFreeTextFontSize.value = value;
          break;
        case AnnotationEditorParamsType.FREETEXT_COLOR:
          editorFreeTextColor.value = value;
          break;
        case AnnotationEditorParamsType.INK_COLOR:
          editorInkColor.value = value;
          break;
        case AnnotationEditorParamsType.INK_THICKNESS:
          editorInkThickness.value = value;
          break;
        case AnnotationEditorParamsType.INK_OPACITY:
          editorInkOpacity.value = value;
          break;
        case AnnotationEditorParamsType.HIGHLIGHT_THICKNESS:
          editorFreeHighlightThickness.value = value;
          break;
        case AnnotationEditorParamsType.HIGHLIGHT_FREE:
          editorFreeHighlightThickness.disabled = !value;
          break;
        case AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL:
          editorHighlightShowAll.setAttribute("aria-pressed", value);
          break;
      }
    }
  });
};
;
const PRECISION = 0.1;
const _CaretBrowsingMode = class _CaretBrowsingMode {
  constructor(abortSignal, mainContainer, viewerContainer, toolbarContainer) {
    __privateAdd(this, _CaretBrowsingMode_instances);
    __privateAdd(this, _mainContainer);
    __privateAdd(this, _toolBarHeight, 0);
    __privateAdd(this, _viewerContainer);
    __privateSet(this, _mainContainer, mainContainer);
    __privateSet(this, _viewerContainer, viewerContainer);
    if (!toolbarContainer) {
      return;
    }
    __privateSet(this, _toolBarHeight, toolbarContainer.getBoundingClientRect().height);
    const toolbarObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === toolbarContainer) {
          __privateSet(this, _toolBarHeight, Math.floor(entry.borderBoxSize[0].blockSize));
          break;
        }
      }
    });
    toolbarObserver.observe(toolbarContainer);
    abortSignal.addEventListener("abort", () => toolbarObserver.disconnect(), {
      once: true
    });
  }
  moveCaret(isUp, select) {
    const selection = document.getSelection();
    if (selection.rangeCount === 0) {
      return;
    }
    const {
      focusNode
    } = selection;
    const focusElement = focusNode.nodeType !== Node.ELEMENT_NODE ? focusNode.parentElement : focusNode;
    const root = focusElement.closest(".textLayer");
    if (!root) {
      return;
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    walker.currentNode = focusNode;
    const focusRect = focusElement.getBoundingClientRect();
    let newLineElement = null;
    const nodeIterator = (isUp ? walker.previousSibling : walker.nextSibling).bind(walker);
    while (nodeIterator()) {
      const element = walker.currentNode.parentElement;
      if (!__privateMethod(this, _CaretBrowsingMode_instances, isOnSameLine_fn).call(this, focusRect, element.getBoundingClientRect())) {
        newLineElement = element;
        break;
      }
    }
    if (!newLineElement) {
      const node = __privateMethod(this, _CaretBrowsingMode_instances, getNodeOnNextPage_fn).call(this, root, isUp);
      if (!node) {
        return;
      }
      if (select) {
        const lastNode = (isUp ? walker.firstChild() : walker.lastChild()) || focusNode;
        selection.extend(lastNode, isUp ? 0 : lastNode.length);
        const range = document.createRange();
        range.setStart(node, isUp ? node.length : 0);
        range.setEnd(node, isUp ? node.length : 0);
        selection.addRange(range);
        return;
      }
      const [caretX2] = __privateMethod(this, _CaretBrowsingMode_instances, getCaretPosition_fn).call(this, selection, isUp);
      const {
        parentElement
      } = node;
      __privateMethod(this, _CaretBrowsingMode_instances, setCaretPosition_fn).call(this, select, selection, parentElement, parentElement.getBoundingClientRect(), caretX2);
      return;
    }
    const [caretX, caretY] = __privateMethod(this, _CaretBrowsingMode_instances, getCaretPosition_fn).call(this, selection, isUp);
    const newLineElementRect = newLineElement.getBoundingClientRect();
    if (__privateMethod(this, _CaretBrowsingMode_instances, isUnderOver_fn).call(this, newLineElementRect, caretX, caretY, isUp)) {
      __privateMethod(this, _CaretBrowsingMode_instances, setCaretPosition_fn).call(this, select, selection, newLineElement, newLineElementRect, caretX);
      return;
    }
    while (nodeIterator()) {
      const element = walker.currentNode.parentElement;
      const elementRect = element.getBoundingClientRect();
      if (!__privateMethod(this, _CaretBrowsingMode_instances, isOnSameLine_fn).call(this, newLineElementRect, elementRect)) {
        break;
      }
      if (__privateMethod(this, _CaretBrowsingMode_instances, isUnderOver_fn).call(this, elementRect, caretX, caretY, isUp)) {
        __privateMethod(this, _CaretBrowsingMode_instances, setCaretPosition_fn).call(this, select, selection, element, elementRect, caretX);
        return;
      }
    }
    __privateMethod(this, _CaretBrowsingMode_instances, setCaretPosition_fn).call(this, select, selection, newLineElement, newLineElementRect, caretX);
  }
};
_mainContainer = new WeakMap();
_toolBarHeight = new WeakMap();
_viewerContainer = new WeakMap();
_CaretBrowsingMode_instances = new WeakSet();
isOnSameLine_fn = function(rect1, rect2) {
  const top1 = rect1.y;
  const bot1 = rect1.bottom;
  const mid1 = rect1.y + rect1.height / 2;
  const top2 = rect2.y;
  const bot2 = rect2.bottom;
  const mid2 = rect2.y + rect2.height / 2;
  return top1 <= mid2 && mid2 <= bot1 || top2 <= mid1 && mid1 <= bot2;
};
isUnderOver_fn = function(rect, x, y, isUp) {
  const midY = rect.y + rect.height / 2;
  return (isUp ? y >= midY : y <= midY) && rect.x - PRECISION <= x && x <= rect.right + PRECISION;
};
isVisible_fn = function(rect) {
  return rect.top >= __privateGet(this, _toolBarHeight) && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};
getCaretPosition_fn = function(selection, isUp) {
  const {
    focusNode,
    focusOffset
  } = selection;
  const range = document.createRange();
  range.setStart(focusNode, focusOffset);
  range.setEnd(focusNode, focusOffset);
  const rect = range.getBoundingClientRect();
  return [rect.x, isUp ? rect.top : rect.bottom];
};
_CaretBrowsingMode_static = new WeakSet();
caretPositionFromPoint_fn = function(x, y) {
  if (!document.caretPositionFromPoint) {
    const {
      startContainer: offsetNode,
      startOffset: offset
    } = document.caretRangeFromPoint(x, y);
    return {
      offsetNode,
      offset
    };
  }
  return document.caretPositionFromPoint(x, y);
};
setCaretPositionHelper_fn = function(selection, caretX, select, element, rect) {
  var _a2, _b, _c, _d;
  rect || (rect = element.getBoundingClientRect());
  if (caretX <= rect.x + PRECISION) {
    if (select) {
      selection.extend(element.firstChild, 0);
    } else {
      selection.setPosition(element.firstChild, 0);
    }
    return;
  }
  if (rect.right - PRECISION <= caretX) {
    const {
      lastChild
    } = element;
    if (select) {
      selection.extend(lastChild, lastChild.length);
    } else {
      selection.setPosition(lastChild, lastChild.length);
    }
    return;
  }
  const midY = rect.y + rect.height / 2;
  let caretPosition = __privateMethod(_a2 = _CaretBrowsingMode, _CaretBrowsingMode_static, caretPositionFromPoint_fn).call(_a2, caretX, midY);
  let parentElement = (_b = caretPosition.offsetNode) == null ? void 0 : _b.parentElement;
  if (parentElement && parentElement !== element) {
    const elementsAtPoint = document.elementsFromPoint(caretX, midY);
    const savedVisibilities = [];
    for (const el of elementsAtPoint) {
      if (el === element) {
        break;
      }
      const {
        style
      } = el;
      savedVisibilities.push([el, style.visibility]);
      style.visibility = "hidden";
    }
    caretPosition = __privateMethod(_c = _CaretBrowsingMode, _CaretBrowsingMode_static, caretPositionFromPoint_fn).call(_c, caretX, midY);
    parentElement = (_d = caretPosition.offsetNode) == null ? void 0 : _d.parentElement;
    for (const [el, visibility] of savedVisibilities) {
      el.style.visibility = visibility;
    }
  }
  if (parentElement !== element) {
    if (select) {
      selection.extend(element.firstChild, 0);
    } else {
      selection.setPosition(element.firstChild, 0);
    }
    return;
  }
  if (select) {
    selection.extend(caretPosition.offsetNode, caretPosition.offset);
  } else {
    selection.setPosition(caretPosition.offsetNode, caretPosition.offset);
  }
};
setCaretPosition_fn = function(select, selection, newLineElement, newLineElementRect, caretX) {
  if (__privateMethod(this, _CaretBrowsingMode_instances, isVisible_fn).call(this, newLineElementRect)) {
    __privateMethod(this, _CaretBrowsingMode_instances, setCaretPositionHelper_fn).call(this, selection, caretX, select, newLineElement, newLineElementRect);
    return;
  }
  __privateGet(this, _mainContainer).addEventListener("scrollend", __privateMethod(this, _CaretBrowsingMode_instances, setCaretPositionHelper_fn).bind(this, selection, caretX, select, newLineElement, null), {
    once: true
  });
  newLineElement.scrollIntoView();
};
getNodeOnNextPage_fn = function(textLayer, isUp) {
  while (true) {
    const page = textLayer.closest(".page");
    const pageNumber = parseInt(page.getAttribute("data-page-number"));
    const nextPage = isUp ? pageNumber - 1 : pageNumber + 1;
    textLayer = __privateGet(this, _viewerContainer).querySelector(`.page[data-page-number="${nextPage}"] .textLayer`);
    if (!textLayer) {
      return null;
    }
    const walker = document.createTreeWalker(textLayer, NodeFilter.SHOW_TEXT);
    const node = isUp ? walker.lastChild() : walker.firstChild();
    if (node) {
      return node;
    }
  }
};
__privateAdd(_CaretBrowsingMode, _CaretBrowsingMode_static);
let CaretBrowsingMode = _CaretBrowsingMode;
;
function download(blobUrl, filename) {
  const a = document.createElement("a");
  if (!a.click) {
    throw new Error('DownloadManager: "a.click()" is not supported.');
  }
  a.href = blobUrl;
  a.target = "_parent";
  if ("download" in a) {
    a.download = filename;
  }
  (document.body || document.documentElement).append(a);
  a.click();
  a.remove();
}
class DownloadManager {
  constructor() {
    __privateAdd(this, _openBlobUrls, /* @__PURE__ */ new WeakMap());
  }
  downloadData(data, filename, contentType) {
    const blobUrl = URL.createObjectURL(new Blob([data], {
      type: contentType
    }));
    download(blobUrl, filename);
  }
  openOrDownloadData(data, filename, dest = null) {
    const isPdfData = isPdfFile(filename);
    const contentType = isPdfData ? "application/pdf" : "";
    if (isPdfData) {
      let blobUrl = __privateGet(this, _openBlobUrls).get(data);
      if (!blobUrl) {
        blobUrl = URL.createObjectURL(new Blob([data], {
          type: contentType
        }));
        __privateGet(this, _openBlobUrls).set(data, blobUrl);
      }
      let viewerUrl;
      viewerUrl = "?file=" + encodeURIComponent(blobUrl + "#" + filename);
      if (dest) {
        viewerUrl += `#${escape(dest)}`;
      }
      try {
        window.open(viewerUrl);
        return true;
      } catch (ex) {
        console.error("openOrDownloadData:", ex);
        URL.revokeObjectURL(blobUrl);
        __privateGet(this, _openBlobUrls).delete(data);
      }
    }
    this.downloadData(data, filename, contentType);
    return false;
  }
  download(data, url, filename) {
    let blobUrl;
    if (data) {
      blobUrl = URL.createObjectURL(new Blob([data], {
        type: "application/pdf"
      }));
    } else {
      if (!createValidAbsoluteUrl(url, "http://example.com")) {
        console.error(`download - not a valid URL: ${url}`);
        return;
      }
      blobUrl = url + "#pdfjs.action=download";
    }
    download(blobUrl, filename);
  }
}
_openBlobUrls = new WeakMap();
;
const _EditorUndoBar = class _EditorUndoBar {
  constructor({
    container,
    message,
    undoButton,
    closeButton
  }, eventBus) {
    __privateAdd(this, _closeButton, null);
    __privateAdd(this, _container2);
    __privateAdd(this, _eventBus4, null);
    __privateAdd(this, _focusTimeout, null);
    __privateAdd(this, _initController, null);
    __publicField(this, "isOpen", false);
    __privateAdd(this, _message);
    __privateAdd(this, _showController, null);
    __privateAdd(this, _undoButton);
    __privateSet(this, _container2, container);
    __privateSet(this, _message, message);
    __privateSet(this, _undoButton, undoButton);
    __privateSet(this, _closeButton, closeButton);
    __privateSet(this, _eventBus4, eventBus);
  }
  destroy() {
    var _a2;
    (_a2 = __privateGet(this, _initController)) == null ? void 0 : _a2.abort();
    __privateSet(this, _initController, null);
    this.hide();
  }
  show(undoAction, messageData) {
    if (!__privateGet(this, _initController)) {
      __privateSet(this, _initController, new AbortController());
      const opts = {
        signal: __privateGet(this, _initController).signal
      };
      const boundHide = this.hide.bind(this);
      __privateGet(this, _container2).addEventListener("contextmenu", noContextMenu, opts);
      __privateGet(this, _closeButton).addEventListener("click", boundHide, opts);
      __privateGet(this, _eventBus4)._on("beforeprint", boundHide, opts);
      __privateGet(this, _eventBus4)._on("download", boundHide, opts);
    }
    this.hide();
    if (typeof messageData === "string") {
      __privateGet(this, _message).setAttribute("data-l10n-id", __privateGet(_EditorUndoBar, _l10nMessages)[messageData]);
    } else {
      __privateGet(this, _message).setAttribute("data-l10n-id", __privateGet(_EditorUndoBar, _l10nMessages)._multiple);
      __privateGet(this, _message).setAttribute("data-l10n-args", JSON.stringify({
        count: messageData
      }));
    }
    this.isOpen = true;
    __privateGet(this, _container2).hidden = false;
    __privateSet(this, _showController, new AbortController());
    __privateGet(this, _undoButton).addEventListener("click", () => {
      undoAction();
      this.hide();
    }, {
      signal: __privateGet(this, _showController).signal
    });
    __privateSet(this, _focusTimeout, setTimeout(() => {
      __privateGet(this, _container2).focus();
      __privateSet(this, _focusTimeout, null);
    }, 100));
  }
  hide() {
    var _a2;
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
    __privateGet(this, _container2).hidden = true;
    (_a2 = __privateGet(this, _showController)) == null ? void 0 : _a2.abort();
    __privateSet(this, _showController, null);
    if (__privateGet(this, _focusTimeout)) {
      clearTimeout(__privateGet(this, _focusTimeout));
      __privateSet(this, _focusTimeout, null);
    }
  }
};
_closeButton = new WeakMap();
_container2 = new WeakMap();
_eventBus4 = new WeakMap();
_focusTimeout = new WeakMap();
_initController = new WeakMap();
_message = new WeakMap();
_showController = new WeakMap();
_undoButton = new WeakMap();
_l10nMessages = new WeakMap();
__privateAdd(_EditorUndoBar, _l10nMessages, Object.freeze({
  highlight: "pdfjs-editor-undo-bar-message-highlight",
  freetext: "pdfjs-editor-undo-bar-message-freetext",
  stamp: "pdfjs-editor-undo-bar-message-stamp",
  ink: "pdfjs-editor-undo-bar-message-ink",
  _multiple: "pdfjs-editor-undo-bar-message-multiple"
}));
let EditorUndoBar = _EditorUndoBar;
;
class OverlayManager {
  constructor() {
    __privateAdd(this, _overlays, /* @__PURE__ */ new WeakMap());
    __privateAdd(this, _active, null);
  }
  get active() {
    return __privateGet(this, _active);
  }
  async register(dialog2, canForceClose = false) {
    if (typeof dialog2 !== "object") {
      throw new Error("Not enough parameters.");
    } else if (__privateGet(this, _overlays).has(dialog2)) {
      throw new Error("The overlay is already registered.");
    }
    __privateGet(this, _overlays).set(dialog2, {
      canForceClose
    });
    dialog2.addEventListener("cancel", (evt) => {
      __privateSet(this, _active, null);
    });
  }
  async open(dialog2) {
    if (!__privateGet(this, _overlays).has(dialog2)) {
      throw new Error("The overlay does not exist.");
    } else if (__privateGet(this, _active)) {
      if (__privateGet(this, _active) === dialog2) {
        throw new Error("The overlay is already active.");
      } else if (__privateGet(this, _overlays).get(dialog2).canForceClose) {
        await this.close();
      } else {
        throw new Error("Another overlay is currently active.");
      }
    }
    __privateSet(this, _active, dialog2);
    dialog2.showModal();
  }
  async close(dialog2 = __privateGet(this, _active)) {
    if (!__privateGet(this, _overlays).has(dialog2)) {
      throw new Error("The overlay does not exist.");
    } else if (!__privateGet(this, _active)) {
      throw new Error("The overlay is currently not active.");
    } else if (__privateGet(this, _active) !== dialog2) {
      throw new Error("Another overlay is currently active.");
    }
    dialog2.close();
    __privateSet(this, _active, null);
  }
}
_overlays = new WeakMap();
_active = new WeakMap();
;
class PasswordPrompt {
  constructor(options, overlayManager2, isViewerEmbedded = false) {
    __privateAdd(this, _PasswordPrompt_instances);
    __privateAdd(this, _activeCapability, null);
    __privateAdd(this, _updateCallback, null);
    __privateAdd(this, _reason, null);
    this.dialog = options.dialog;
    this.label = options.label;
    this.input = options.input;
    this.submitButton = options.submitButton;
    this.cancelButton = options.cancelButton;
    this.overlayManager = overlayManager2;
    this._isViewerEmbedded = isViewerEmbedded;
    this.submitButton.addEventListener("click", __privateMethod(this, _PasswordPrompt_instances, verify_fn).bind(this));
    this.cancelButton.addEventListener("click", this.close.bind(this));
    this.input.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        __privateMethod(this, _PasswordPrompt_instances, verify_fn).call(this);
      }
    });
    this.overlayManager.register(this.dialog, true);
    this.dialog.addEventListener("close", __privateMethod(this, _PasswordPrompt_instances, cancel_fn2).bind(this));
  }
  async open() {
    var _a2;
    await ((_a2 = __privateGet(this, _activeCapability)) == null ? void 0 : _a2.promise);
    __privateSet(this, _activeCapability, Promise.withResolvers());
    try {
      await this.overlayManager.open(this.dialog);
    } catch (ex) {
      __privateGet(this, _activeCapability).resolve();
      throw ex;
    }
    const passwordIncorrect = __privateGet(this, _reason) === PasswordResponses.INCORRECT_PASSWORD;
    if (!this._isViewerEmbedded || passwordIncorrect) {
      this.input.focus();
    }
    this.label.setAttribute("data-l10n-id", passwordIncorrect ? "pdfjs-password-invalid" : "pdfjs-password-label");
  }
  async close() {
    if (this.overlayManager.active === this.dialog) {
      this.overlayManager.close(this.dialog);
    }
  }
  async setUpdateCallback(updateCallback, reason) {
    if (__privateGet(this, _activeCapability)) {
      await __privateGet(this, _activeCapability).promise;
    }
    __privateSet(this, _updateCallback, updateCallback);
    __privateSet(this, _reason, reason);
  }
}
_activeCapability = new WeakMap();
_updateCallback = new WeakMap();
_reason = new WeakMap();
_PasswordPrompt_instances = new WeakSet();
verify_fn = function() {
  const password = this.input.value;
  if ((password == null ? void 0 : password.length) > 0) {
    __privateMethod(this, _PasswordPrompt_instances, invokeCallback_fn).call(this, password);
  }
};
cancel_fn2 = function() {
  __privateMethod(this, _PasswordPrompt_instances, invokeCallback_fn).call(this, new Error("PasswordPrompt cancelled."));
  __privateGet(this, _activeCapability).resolve();
};
invokeCallback_fn = function(password) {
  if (!__privateGet(this, _updateCallback)) {
    return;
  }
  this.close();
  this.input.value = "";
  __privateGet(this, _updateCallback).call(this, password);
  __privateSet(this, _updateCallback, null);
};
;
const TREEITEM_OFFSET_TOP = -100;
const TREEITEM_SELECTED_CLASS = "selected";
class BaseTreeViewer {
  constructor(options) {
    this.container = options.container;
    this.eventBus = options.eventBus;
    this._l10n = options.l10n;
    this.reset();
  }
  reset() {
    this._pdfDocument = null;
    this._lastToggleIsShow = true;
    this._currentTreeItem = null;
    this.container.textContent = "";
    this.container.classList.remove("treeWithDeepNesting");
  }
  _dispatchEvent(count) {
    throw new Error("Not implemented: _dispatchEvent");
  }
  _bindLink(element, params) {
    throw new Error("Not implemented: _bindLink");
  }
  _normalizeTextContent(str) {
    return removeNullCharacters(str, true) || "\u2013";
  }
  _addToggleButton(div, hidden = false) {
    const toggler = document.createElement("div");
    toggler.className = "treeItemToggler";
    if (hidden) {
      toggler.classList.add("treeItemsHidden");
    }
    toggler.onclick = (evt) => {
      evt.stopPropagation();
      toggler.classList.toggle("treeItemsHidden");
      if (evt.shiftKey) {
        const shouldShowAll = !toggler.classList.contains("treeItemsHidden");
        this._toggleTreeItem(div, shouldShowAll);
      }
    };
    div.prepend(toggler);
  }
  _toggleTreeItem(root, show = false) {
    this._l10n.pause();
    this._lastToggleIsShow = show;
    for (const toggler of root.querySelectorAll(".treeItemToggler")) {
      toggler.classList.toggle("treeItemsHidden", !show);
    }
    this._l10n.resume();
  }
  _toggleAllTreeItems() {
    this._toggleTreeItem(this.container, !this._lastToggleIsShow);
  }
  _finishRendering(fragment, count, hasAnyNesting = false) {
    if (hasAnyNesting) {
      this.container.classList.add("treeWithDeepNesting");
      this._lastToggleIsShow = !fragment.querySelector(".treeItemsHidden");
    }
    this._l10n.pause();
    this.container.append(fragment);
    this._l10n.resume();
    this._dispatchEvent(count);
  }
  render(params) {
    throw new Error("Not implemented: render");
  }
  _updateCurrentTreeItem(treeItem = null) {
    if (this._currentTreeItem) {
      this._currentTreeItem.classList.remove(TREEITEM_SELECTED_CLASS);
      this._currentTreeItem = null;
    }
    if (treeItem) {
      treeItem.classList.add(TREEITEM_SELECTED_CLASS);
      this._currentTreeItem = treeItem;
    }
  }
  _scrollToCurrentTreeItem(treeItem) {
    if (!treeItem) {
      return;
    }
    this._l10n.pause();
    let currentNode = treeItem.parentNode;
    while (currentNode && currentNode !== this.container) {
      if (currentNode.classList.contains("treeItem")) {
        const toggler = currentNode.firstElementChild;
        toggler == null ? void 0 : toggler.classList.remove("treeItemsHidden");
      }
      currentNode = currentNode.parentNode;
    }
    this._l10n.resume();
    this._updateCurrentTreeItem(treeItem);
    this.container.scrollTo(treeItem.offsetLeft, treeItem.offsetTop + TREEITEM_OFFSET_TOP);
  }
}
;
class PDFAttachmentViewer extends BaseTreeViewer {
  constructor(options) {
    super(options);
    __privateAdd(this, _PDFAttachmentViewer_instances);
    this.downloadManager = options.downloadManager;
    this.eventBus._on("fileattachmentannotation", __privateMethod(this, _PDFAttachmentViewer_instances, appendAttachment_fn).bind(this));
  }
  reset(keepRenderedCapability = false) {
    super.reset();
    this._attachments = null;
    if (!keepRenderedCapability) {
      this._renderedCapability = Promise.withResolvers();
    }
    this._pendingDispatchEvent = false;
  }
  async _dispatchEvent(attachmentsCount) {
    this._renderedCapability.resolve();
    if (attachmentsCount === 0 && !this._pendingDispatchEvent) {
      this._pendingDispatchEvent = true;
      await waitOnEventOrTimeout({
        target: this.eventBus,
        name: "annotationlayerrendered",
        delay: 1e3
      });
      if (!this._pendingDispatchEvent) {
        return;
      }
    }
    this._pendingDispatchEvent = false;
    this.eventBus.dispatch("attachmentsloaded", {
      source: this,
      attachmentsCount
    });
  }
  _bindLink(element, {
    content,
    description,
    filename
  }) {
    if (description) {
      element.title = description;
    }
    element.onclick = () => {
      this.downloadManager.openOrDownloadData(content, filename);
      return false;
    };
  }
  render({
    attachments,
    keepRenderedCapability = false
  }) {
    if (this._attachments) {
      this.reset(keepRenderedCapability);
    }
    this._attachments = attachments || null;
    if (!attachments) {
      this._dispatchEvent(0);
      return;
    }
    const fragment = document.createDocumentFragment();
    let attachmentsCount = 0;
    for (const name in attachments) {
      const item = attachments[name];
      const div = document.createElement("div");
      div.className = "treeItem";
      const element = document.createElement("a");
      this._bindLink(element, item);
      element.textContent = this._normalizeTextContent(item.filename);
      div.append(element);
      fragment.append(div);
      attachmentsCount++;
    }
    this._finishRendering(fragment, attachmentsCount);
  }
}
_PDFAttachmentViewer_instances = new WeakSet();
appendAttachment_fn = function(item) {
  const renderedPromise = this._renderedCapability.promise;
  renderedPromise.then(() => {
    if (renderedPromise !== this._renderedCapability.promise) {
      return;
    }
    const attachments = this._attachments || /* @__PURE__ */ Object.create(null);
    for (const name in attachments) {
      if (item.filename === name) {
        return;
      }
    }
    attachments[item.filename] = item;
    this.render({
      attachments,
      keepRenderedCapability: true
    });
  });
};
;
const CSS_CLASS_GRAB = "grab-to-pan-grab";
class GrabToPan {
  constructor({
    element
  }) {
    __privateAdd(this, _GrabToPan_instances);
    __privateAdd(this, _activateAC, null);
    __privateAdd(this, _mouseDownAC, null);
    __privateAdd(this, _scrollAC, null);
    this.element = element;
    this.document = element.ownerDocument;
    const overlay = this.overlay = document.createElement("div");
    overlay.className = "grab-to-pan-grabbing";
  }
  activate() {
    if (!__privateGet(this, _activateAC)) {
      __privateSet(this, _activateAC, new AbortController());
      this.element.addEventListener("mousedown", __privateMethod(this, _GrabToPan_instances, onMouseDown_fn).bind(this), {
        capture: true,
        signal: __privateGet(this, _activateAC).signal
      });
      this.element.classList.add(CSS_CLASS_GRAB);
    }
  }
  deactivate() {
    if (__privateGet(this, _activateAC)) {
      __privateGet(this, _activateAC).abort();
      __privateSet(this, _activateAC, null);
      __privateMethod(this, _GrabToPan_instances, endPan_fn).call(this);
      this.element.classList.remove(CSS_CLASS_GRAB);
    }
  }
  toggle() {
    if (__privateGet(this, _activateAC)) {
      this.deactivate();
    } else {
      this.activate();
    }
  }
  ignoreTarget(node) {
    return node.matches("a[href], a[href] *, input, textarea, button, button *, select, option");
  }
}
_activateAC = new WeakMap();
_mouseDownAC = new WeakMap();
_scrollAC = new WeakMap();
_GrabToPan_instances = new WeakSet();
onMouseDown_fn = function(event) {
  if (event.button !== 0 || this.ignoreTarget(event.target)) {
    return;
  }
  if (event.originalTarget) {
    try {
      event.originalTarget.tagName;
    } catch {
      return;
    }
  }
  this.scrollLeftStart = this.element.scrollLeft;
  this.scrollTopStart = this.element.scrollTop;
  this.clientXStart = event.clientX;
  this.clientYStart = event.clientY;
  __privateSet(this, _mouseDownAC, new AbortController());
  const boundEndPan = __privateMethod(this, _GrabToPan_instances, endPan_fn).bind(this), mouseOpts = {
    capture: true,
    signal: __privateGet(this, _mouseDownAC).signal
  };
  this.document.addEventListener("mousemove", __privateMethod(this, _GrabToPan_instances, onMouseMove_fn).bind(this), mouseOpts);
  this.document.addEventListener("mouseup", boundEndPan, mouseOpts);
  __privateSet(this, _scrollAC, new AbortController());
  this.element.addEventListener("scroll", boundEndPan, {
    capture: true,
    signal: __privateGet(this, _scrollAC).signal
  });
  stopEvent(event);
  const focusedElement = document.activeElement;
  if (focusedElement && !focusedElement.contains(event.target)) {
    focusedElement.blur();
  }
};
onMouseMove_fn = function(event) {
  var _a2;
  (_a2 = __privateGet(this, _scrollAC)) == null ? void 0 : _a2.abort();
  __privateSet(this, _scrollAC, null);
  if (!(event.buttons & 1)) {
    __privateMethod(this, _GrabToPan_instances, endPan_fn).call(this);
    return;
  }
  const xDiff = event.clientX - this.clientXStart;
  const yDiff = event.clientY - this.clientYStart;
  this.element.scrollTo({
    top: this.scrollTopStart - yDiff,
    left: this.scrollLeftStart - xDiff,
    behavior: "instant"
  });
  if (!this.overlay.parentNode) {
    document.body.append(this.overlay);
  }
};
endPan_fn = function() {
  var _a2, _b;
  (_a2 = __privateGet(this, _mouseDownAC)) == null ? void 0 : _a2.abort();
  __privateSet(this, _mouseDownAC, null);
  (_b = __privateGet(this, _scrollAC)) == null ? void 0 : _b.abort();
  __privateSet(this, _scrollAC, null);
  this.overlay.remove();
};
;
class PDFCursorTools {
  constructor({
    container,
    eventBus,
    cursorToolOnLoad = CursorTool.SELECT
  }) {
    __privateAdd(this, _PDFCursorTools_instances);
    __privateAdd(this, _active2, CursorTool.SELECT);
    __privateAdd(this, _prevActive, null);
    this.container = container;
    this.eventBus = eventBus;
    __privateMethod(this, _PDFCursorTools_instances, addEventListeners_fn).call(this);
    Promise.resolve().then(() => {
      this.switchTool(cursorToolOnLoad);
    });
  }
  get activeTool() {
    return __privateGet(this, _active2);
  }
  switchTool(tool) {
    if (__privateGet(this, _prevActive) !== null) {
      return;
    }
    __privateMethod(this, _PDFCursorTools_instances, switchTool_fn).call(this, tool);
  }
  get _handTool() {
    return shadow(this, "_handTool", new GrabToPan({
      element: this.container
    }));
  }
}
_active2 = new WeakMap();
_prevActive = new WeakMap();
_PDFCursorTools_instances = new WeakSet();
switchTool_fn = function(tool, disabled = false) {
  if (tool === __privateGet(this, _active2)) {
    if (__privateGet(this, _prevActive) !== null) {
      this.eventBus.dispatch("cursortoolchanged", {
        source: this,
        tool,
        disabled
      });
    }
    return;
  }
  const disableActiveTool = () => {
    switch (__privateGet(this, _active2)) {
      case CursorTool.SELECT:
        break;
      case CursorTool.HAND:
        this._handTool.deactivate();
        break;
      case CursorTool.ZOOM:
    }
  };
  switch (tool) {
    case CursorTool.SELECT:
      disableActiveTool();
      break;
    case CursorTool.HAND:
      disableActiveTool();
      this._handTool.activate();
      break;
    case CursorTool.ZOOM:
    default:
      console.error(`switchTool: "${tool}" is an unsupported value.`);
      return;
  }
  __privateSet(this, _active2, tool);
  this.eventBus.dispatch("cursortoolchanged", {
    source: this,
    tool,
    disabled
  });
};
addEventListeners_fn = function() {
  this.eventBus._on("switchcursortool", (evt) => {
    if (!evt.reset) {
      this.switchTool(evt.tool);
    } else if (__privateGet(this, _prevActive) !== null) {
      annotationEditorMode = AnnotationEditorType.NONE;
      presentationModeState = PresentationModeState.NORMAL;
      enableActive();
    }
  });
  let annotationEditorMode = AnnotationEditorType.NONE, presentationModeState = PresentationModeState.NORMAL;
  const disableActive = () => {
    var _a2;
    (_a2 = __privateGet(this, _prevActive)) != null ? _a2 : __privateSet(this, _prevActive, __privateGet(this, _active2));
    __privateMethod(this, _PDFCursorTools_instances, switchTool_fn).call(this, CursorTool.SELECT, true);
  };
  const enableActive = () => {
    if (__privateGet(this, _prevActive) !== null && annotationEditorMode === AnnotationEditorType.NONE && presentationModeState === PresentationModeState.NORMAL) {
      __privateMethod(this, _PDFCursorTools_instances, switchTool_fn).call(this, __privateGet(this, _prevActive));
      __privateSet(this, _prevActive, null);
    }
  };
  this.eventBus._on("annotationeditormodechanged", ({
    mode
  }) => {
    annotationEditorMode = mode;
    if (mode === AnnotationEditorType.NONE) {
      enableActive();
    } else {
      disableActive();
    }
  });
  this.eventBus._on("presentationmodechanged", ({
    state
  }) => {
    presentationModeState = state;
    if (state === PresentationModeState.NORMAL) {
      enableActive();
    } else if (state === PresentationModeState.FULLSCREEN) {
      disableActive();
    }
  });
};
;
const NON_METRIC_LOCALES = ["en-us", "en-lr", "my"];
const US_PAGE_NAMES = {
  "8.5x11": "pdfjs-document-properties-page-size-name-letter",
  "8.5x14": "pdfjs-document-properties-page-size-name-legal"
};
const METRIC_PAGE_NAMES = {
  "297x420": "pdfjs-document-properties-page-size-name-a-three",
  "210x297": "pdfjs-document-properties-page-size-name-a-four"
};
function getPageName(size, isPortrait, pageNames) {
  const width = isPortrait ? size.width : size.height;
  const height = isPortrait ? size.height : size.width;
  return pageNames[`${width}x${height}`];
}
class PDFDocumentProperties {
  constructor({
    dialog: dialog2,
    fields,
    closeButton
  }, overlayManager2, eventBus, l10n, fileNameLookup) {
    __privateAdd(this, _PDFDocumentProperties_instances);
    __privateAdd(this, _fieldData, null);
    this.dialog = dialog2;
    this.fields = fields;
    this.overlayManager = overlayManager2;
    this.l10n = l10n;
    this._fileNameLookup = fileNameLookup;
    __privateMethod(this, _PDFDocumentProperties_instances, reset_fn).call(this);
    closeButton.addEventListener("click", this.close.bind(this));
    this.overlayManager.register(this.dialog);
    eventBus._on("pagechanging", (evt) => {
      this._currentPageNumber = evt.pageNumber;
    });
    eventBus._on("rotationchanging", (evt) => {
      this._pagesRotation = evt.pagesRotation;
    });
  }
  async open() {
    await Promise.all([this.overlayManager.open(this.dialog), this._dataAvailableCapability.promise]);
    const currentPageNumber = this._currentPageNumber;
    const pagesRotation = this._pagesRotation;
    if (__privateGet(this, _fieldData) && currentPageNumber === __privateGet(this, _fieldData)._currentPageNumber && pagesRotation === __privateGet(this, _fieldData)._pagesRotation) {
      __privateMethod(this, _PDFDocumentProperties_instances, updateUI_fn).call(this);
      return;
    }
    const [{
      info,
      contentLength
    }, pdfPage] = await Promise.all([this.pdfDocument.getMetadata(), this.pdfDocument.getPage(currentPageNumber)]);
    const [fileName, fileSize, creationDate, modificationDate, pageSize, isLinearized] = await Promise.all([this._fileNameLookup(), __privateMethod(this, _PDFDocumentProperties_instances, parseFileSize_fn).call(this, contentLength), __privateMethod(this, _PDFDocumentProperties_instances, parseDate_fn).call(this, info.CreationDate), __privateMethod(this, _PDFDocumentProperties_instances, parseDate_fn).call(this, info.ModDate), __privateMethod(this, _PDFDocumentProperties_instances, parsePageSize_fn).call(this, getPageSizeInches(pdfPage), pagesRotation), __privateMethod(this, _PDFDocumentProperties_instances, parseLinearization_fn).call(this, info.IsLinearized)]);
    __privateSet(this, _fieldData, Object.freeze({
      fileName,
      fileSize,
      title: info.Title,
      author: info.Author,
      subject: info.Subject,
      keywords: info.Keywords,
      creationDate,
      modificationDate,
      creator: info.Creator,
      producer: info.Producer,
      version: info.PDFFormatVersion,
      pageCount: this.pdfDocument.numPages,
      pageSize,
      linearized: isLinearized,
      _currentPageNumber: currentPageNumber,
      _pagesRotation: pagesRotation
    }));
    __privateMethod(this, _PDFDocumentProperties_instances, updateUI_fn).call(this);
    const {
      length
    } = await this.pdfDocument.getDownloadInfo();
    if (contentLength === length) {
      return;
    }
    const data = Object.assign(/* @__PURE__ */ Object.create(null), __privateGet(this, _fieldData));
    data.fileSize = await __privateMethod(this, _PDFDocumentProperties_instances, parseFileSize_fn).call(this, length);
    __privateSet(this, _fieldData, Object.freeze(data));
    __privateMethod(this, _PDFDocumentProperties_instances, updateUI_fn).call(this);
  }
  async close() {
    this.overlayManager.close(this.dialog);
  }
  setDocument(pdfDocument) {
    if (this.pdfDocument) {
      __privateMethod(this, _PDFDocumentProperties_instances, reset_fn).call(this);
      __privateMethod(this, _PDFDocumentProperties_instances, updateUI_fn).call(this);
    }
    if (!pdfDocument) {
      return;
    }
    this.pdfDocument = pdfDocument;
    this._dataAvailableCapability.resolve();
  }
}
_fieldData = new WeakMap();
_PDFDocumentProperties_instances = new WeakSet();
reset_fn = function() {
  this.pdfDocument = null;
  __privateSet(this, _fieldData, null);
  this._dataAvailableCapability = Promise.withResolvers();
  this._currentPageNumber = 1;
  this._pagesRotation = 0;
};
updateUI_fn = function() {
  var _a2;
  if (__privateGet(this, _fieldData) && this.overlayManager.active !== this.dialog) {
    return;
  }
  for (const id in this.fields) {
    const content = (_a2 = __privateGet(this, _fieldData)) == null ? void 0 : _a2[id];
    this.fields[id].textContent = content || content === 0 ? content : "-";
  }
};
parseFileSize_fn = async function(b = 0) {
  const kb = b / 1024, mb = kb / 1024;
  return kb ? this.l10n.get(mb >= 1 ? "pdfjs-document-properties-size-mb" : "pdfjs-document-properties-size-kb", {
    mb,
    kb,
    b
  }) : void 0;
};
parsePageSize_fn = async function(pageSizeInches, pagesRotation) {
  if (!pageSizeInches) {
    return void 0;
  }
  if (pagesRotation % 180 !== 0) {
    pageSizeInches = {
      width: pageSizeInches.height,
      height: pageSizeInches.width
    };
  }
  const isPortrait = isPortraitOrientation(pageSizeInches), nonMetric = NON_METRIC_LOCALES.includes(this.l10n.getLanguage());
  let sizeInches = {
    width: Math.round(pageSizeInches.width * 100) / 100,
    height: Math.round(pageSizeInches.height * 100) / 100
  };
  let sizeMillimeters = {
    width: Math.round(pageSizeInches.width * 25.4 * 10) / 10,
    height: Math.round(pageSizeInches.height * 25.4 * 10) / 10
  };
  let nameId = getPageName(sizeInches, isPortrait, US_PAGE_NAMES) || getPageName(sizeMillimeters, isPortrait, METRIC_PAGE_NAMES);
  if (!nameId && !(Number.isInteger(sizeMillimeters.width) && Number.isInteger(sizeMillimeters.height))) {
    const exactMillimeters = {
      width: pageSizeInches.width * 25.4,
      height: pageSizeInches.height * 25.4
    };
    const intMillimeters = {
      width: Math.round(sizeMillimeters.width),
      height: Math.round(sizeMillimeters.height)
    };
    if (Math.abs(exactMillimeters.width - intMillimeters.width) < 0.1 && Math.abs(exactMillimeters.height - intMillimeters.height) < 0.1) {
      nameId = getPageName(intMillimeters, isPortrait, METRIC_PAGE_NAMES);
      if (nameId) {
        sizeInches = {
          width: Math.round(intMillimeters.width / 25.4 * 100) / 100,
          height: Math.round(intMillimeters.height / 25.4 * 100) / 100
        };
        sizeMillimeters = intMillimeters;
      }
    }
  }
  const [{
    width,
    height
  }, unit, name, orientation] = await Promise.all([nonMetric ? sizeInches : sizeMillimeters, this.l10n.get(nonMetric ? "pdfjs-document-properties-page-size-unit-inches" : "pdfjs-document-properties-page-size-unit-millimeters"), nameId && this.l10n.get(nameId), this.l10n.get(isPortrait ? "pdfjs-document-properties-page-size-orientation-portrait" : "pdfjs-document-properties-page-size-orientation-landscape")]);
  return this.l10n.get(name ? "pdfjs-document-properties-page-size-dimension-name-string" : "pdfjs-document-properties-page-size-dimension-string", {
    width,
    height,
    unit,
    name,
    orientation
  });
};
parseDate_fn = async function(inputDate) {
  const dateObj = PDFDateString.toDateObject(inputDate);
  return dateObj ? this.l10n.get("pdfjs-document-properties-date-time-string", {
    dateObj: dateObj.valueOf()
  }) : void 0;
};
parseLinearization_fn = function(isLinearized) {
  return this.l10n.get(isLinearized ? "pdfjs-document-properties-linearized-yes" : "pdfjs-document-properties-linearized-no");
};
;
const CharacterType = {
  SPACE: 0,
  ALPHA_LETTER: 1,
  PUNCT: 2,
  HAN_LETTER: 3,
  KATAKANA_LETTER: 4,
  HIRAGANA_LETTER: 5,
  HALFWIDTH_KATAKANA_LETTER: 6,
  THAI_LETTER: 7
};
function isAlphabeticalScript(charCode) {
  return charCode < 11904;
}
function isAscii(charCode) {
  return (charCode & 65408) === 0;
}
function isAsciiAlpha(charCode) {
  return charCode >= 97 && charCode <= 122 || charCode >= 65 && charCode <= 90;
}
function isAsciiDigit(charCode) {
  return charCode >= 48 && charCode <= 57;
}
function isAsciiSpace(charCode) {
  return charCode === 32 || charCode === 9 || charCode === 13 || charCode === 10;
}
function isHan(charCode) {
  return charCode >= 13312 && charCode <= 40959 || charCode >= 63744 && charCode <= 64255;
}
function isKatakana(charCode) {
  return charCode >= 12448 && charCode <= 12543;
}
function isHiragana(charCode) {
  return charCode >= 12352 && charCode <= 12447;
}
function isHalfwidthKatakana(charCode) {
  return charCode >= 65376 && charCode <= 65439;
}
function isThai(charCode) {
  return (charCode & 65408) === 3584;
}
function getCharacterType(charCode) {
  if (isAlphabeticalScript(charCode)) {
    if (isAscii(charCode)) {
      if (isAsciiSpace(charCode)) {
        return CharacterType.SPACE;
      } else if (isAsciiAlpha(charCode) || isAsciiDigit(charCode) || charCode === 95) {
        return CharacterType.ALPHA_LETTER;
      }
      return CharacterType.PUNCT;
    } else if (isThai(charCode)) {
      return CharacterType.THAI_LETTER;
    } else if (charCode === 160) {
      return CharacterType.SPACE;
    }
    return CharacterType.ALPHA_LETTER;
  }
  if (isHan(charCode)) {
    return CharacterType.HAN_LETTER;
  } else if (isKatakana(charCode)) {
    return CharacterType.KATAKANA_LETTER;
  } else if (isHiragana(charCode)) {
    return CharacterType.HIRAGANA_LETTER;
  } else if (isHalfwidthKatakana(charCode)) {
    return CharacterType.HALFWIDTH_KATAKANA_LETTER;
  }
  return CharacterType.ALPHA_LETTER;
}
let NormalizeWithNFKC;
function getNormalizeWithNFKC() {
  NormalizeWithNFKC || (NormalizeWithNFKC = `\xA0\xA8\xAA\xAF\xB2-\xB5\xB8-\xBA\xBC-\xBE\u0132-\u0133\u013F-\u0140\u0149\u017F\u01C4-\u01CC\u01F1-\u01F3\u02B0-\u02B8\u02D8-\u02DD\u02E0-\u02E4\u0374\u037A\u037E\u0384-\u0385\u0387\u03D0-\u03D6\u03F0-\u03F2\u03F4-\u03F5\u03F9\u0587\u0675-\u0678\u0958-\u095F\u09DC-\u09DD\u09DF\u0A33\u0A36\u0A59-\u0A5B\u0A5E\u0B5C-\u0B5D\u0E33\u0EB3\u0EDC-\u0EDD\u0F0C\u0F43\u0F4D\u0F52\u0F57\u0F5C\u0F69\u10FC\u1D2C-\u1D2E\u1D30-\u1D3A\u1D3C-\u1D4D\u1D4F-\u1D6A\u1D78\u1D9B-\u1DBF\u1E9A-\u1E9B\u1F71\u1F73\u1F75\u1F77\u1F79\u1F7B\u1F7D\u1FBB\u1FBD-\u1FC1\u1FC9\u1FCB\u1FCD-\u1FCF\u1FD3\u1FDB\u1FDD-\u1FDF\u1FE3\u1FEB\u1FED-\u1FEF\u1FF9\u1FFB\u1FFD-\u1FFE\u2000-\u200A\u2011\u2017\u2024-\u2026\u202F\u2033-\u2034\u2036-\u2037\u203C\u203E\u2047-\u2049\u2057\u205F\u2070-\u2071\u2074-\u208E\u2090-\u209C\u20A8\u2100-\u2103\u2105-\u2107\u2109-\u2113\u2115-\u2116\u2119-\u211D\u2120-\u2122\u2124\u2126\u2128\u212A-\u212D\u212F-\u2131\u2133-\u2139\u213B-\u2140\u2145-\u2149\u2150-\u217F\u2189\u222C-\u222D\u222F-\u2230\u2329-\u232A\u2460-\u24EA\u2A0C\u2A74-\u2A76\u2ADC\u2C7C-\u2C7D\u2D6F\u2E9F\u2EF3\u2F00-\u2FD5\u3000\u3036\u3038-\u303A\u309B-\u309C\u309F\u30FF\u3131-\u318E\u3192-\u319F\u3200-\u321E\u3220-\u3247\u3250-\u327E\u3280-\u33FF\uA69C-\uA69D\uA770\uA7F2-\uA7F4\uA7F8-\uA7F9\uAB5C-\uAB5F\uAB69\uF900-\uFA0D\uFA10\uFA12\uFA15-\uFA1E\uFA20\uFA22\uFA25-\uFA26\uFA2A-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFC\uFE10-\uFE19\uFE30-\uFE44\uFE47-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFE70-\uFE72\uFE74\uFE76-\uFEFC\uFF01-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\uFFE0-\uFFE6`);
  return NormalizeWithNFKC;
}
;
const FindState = {
  FOUND: 0,
  NOT_FOUND: 1,
  WRAPPED: 2,
  PENDING: 3
};
const FIND_TIMEOUT = 250;
const MATCH_SCROLL_OFFSET_TOP = -50;
const MATCH_SCROLL_OFFSET_LEFT = -400;
const CHARACTERS_TO_NORMALIZE = {
  "\u2010": "-",
  "\u2018": "'",
  "\u2019": "'",
  "\u201A": "'",
  "\u201B": "'",
  "\u201C": '"',
  "\u201D": '"',
  "\u201E": '"',
  "\u201F": '"',
  "\xBC": "1/4",
  "\xBD": "1/2",
  "\xBE": "3/4"
};
const DIACRITICS_EXCEPTION = /* @__PURE__ */ new Set([12441, 12442, 2381, 2509, 2637, 2765, 2893, 3021, 3149, 3277, 3387, 3388, 3405, 3530, 3642, 3770, 3972, 4153, 4154, 5908, 5940, 6098, 6752, 6980, 7082, 7083, 7154, 7155, 11647, 43014, 43052, 43204, 43347, 43456, 43766, 44013, 3158, 3953, 3954, 3962, 3963, 3964, 3965, 3968, 3956]);
let DIACRITICS_EXCEPTION_STR;
const DIACRITICS_REG_EXP = new RegExp("\\p{M}+", "gu");
const SPECIAL_CHARS_REG_EXP = new RegExp("([.*+?^${}()|[\\]\\\\])|(\\p{P})|(\\s+)|(\\p{M})|(\\p{L})", "gu");
const NOT_DIACRITIC_FROM_END_REG_EXP = new RegExp("([^\\p{M}])\\p{M}*$", "u");
const NOT_DIACRITIC_FROM_START_REG_EXP = new RegExp("^\\p{M}*([^\\p{M}])", "u");
const SYLLABLES_REG_EXP = /[\uAC00-\uD7AF\uFA6C\uFACF-\uFAD1\uFAD5-\uFAD7]+/g;
const SYLLABLES_LENGTHS = /* @__PURE__ */ new Map();
const FIRST_CHAR_SYLLABLES_REG_EXP = "[\\u1100-\\u1112\\ud7a4-\\ud7af\\ud84a\\ud84c\\ud850\\ud854\\ud857\\ud85f]";
const NFKC_CHARS_TO_NORMALIZE = /* @__PURE__ */ new Map();
let noSyllablesRegExp = null;
let withSyllablesRegExp = null;
function normalize(text) {
  const syllablePositions = [];
  let m;
  while ((m = SYLLABLES_REG_EXP.exec(text)) !== null) {
    let {
      index
    } = m;
    for (const char of m[0]) {
      let len = SYLLABLES_LENGTHS.get(char);
      if (!len) {
        len = char.normalize("NFD").length;
        SYLLABLES_LENGTHS.set(char, len);
      }
      syllablePositions.push([len, index++]);
    }
  }
  let normalizationRegex;
  if (syllablePositions.length === 0 && noSyllablesRegExp) {
    normalizationRegex = noSyllablesRegExp;
  } else if (syllablePositions.length > 0 && withSyllablesRegExp) {
    normalizationRegex = withSyllablesRegExp;
  } else {
    const replace = Object.keys(CHARACTERS_TO_NORMALIZE).join("");
    const toNormalizeWithNFKC = getNormalizeWithNFKC();
    const CJK = "(?:\\p{Ideographic}|[\u3040-\u30FF])";
    const HKDiacritics = "(?:\u3099|\u309A)";
    const CompoundWord = "\\p{Ll}-\\n\\p{Lu}";
    const regexp = `([${replace}])|([${toNormalizeWithNFKC}])|(${HKDiacritics}\\n)|(\\p{M}+(?:-\\n)?)|(${CompoundWord})|(\\S-\\n)|(${CJK}\\n)|(\\n)`;
    if (syllablePositions.length === 0) {
      normalizationRegex = noSyllablesRegExp = new RegExp(regexp + "|(\\u0000)", "gum");
    } else {
      normalizationRegex = withSyllablesRegExp = new RegExp(regexp + `|(${FIRST_CHAR_SYLLABLES_REG_EXP})`, "gum");
    }
  }
  const rawDiacriticsPositions = [];
  while ((m = DIACRITICS_REG_EXP.exec(text)) !== null) {
    rawDiacriticsPositions.push([m[0].length, m.index]);
  }
  let normalized = text.normalize("NFD");
  const positions = [0, 0];
  let rawDiacriticsIndex = 0;
  let syllableIndex = 0;
  let shift = 0;
  let shiftOrigin = 0;
  let eol = 0;
  let hasDiacritics = false;
  normalized = normalized.replace(normalizationRegex, (match2, p1, p2, p3, p4, p5, p6, p7, p8, p9, i) => {
    var _a2, _b, _c;
    i -= shiftOrigin;
    if (p1) {
      const replacement = CHARACTERS_TO_NORMALIZE[p1];
      const jj = replacement.length;
      for (let j = 1; j < jj; j++) {
        positions.push(i - shift + j, shift - j);
      }
      shift -= jj - 1;
      return replacement;
    }
    if (p2) {
      let replacement = NFKC_CHARS_TO_NORMALIZE.get(p2);
      if (!replacement) {
        replacement = p2.normalize("NFKC");
        NFKC_CHARS_TO_NORMALIZE.set(p2, replacement);
      }
      const jj = replacement.length;
      for (let j = 1; j < jj; j++) {
        positions.push(i - shift + j, shift - j);
      }
      shift -= jj - 1;
      return replacement;
    }
    if (p3) {
      hasDiacritics = true;
      if (i + eol === ((_a2 = rawDiacriticsPositions[rawDiacriticsIndex]) == null ? void 0 : _a2[1])) {
        ++rawDiacriticsIndex;
      } else {
        positions.push(i - 1 - shift + 1, shift - 1);
        shift -= 1;
        shiftOrigin += 1;
      }
      positions.push(i - shift + 1, shift);
      shiftOrigin += 1;
      eol += 1;
      return p3.charAt(0);
    }
    if (p4) {
      const hasTrailingDashEOL = p4.endsWith("\n");
      const len = hasTrailingDashEOL ? p4.length - 2 : p4.length;
      hasDiacritics = true;
      let jj = len;
      if (i + eol === ((_b = rawDiacriticsPositions[rawDiacriticsIndex]) == null ? void 0 : _b[1])) {
        jj -= rawDiacriticsPositions[rawDiacriticsIndex][0];
        ++rawDiacriticsIndex;
      }
      for (let j = 1; j <= jj; j++) {
        positions.push(i - 1 - shift + j, shift - j);
      }
      shift -= jj;
      shiftOrigin += jj;
      if (hasTrailingDashEOL) {
        i += len - 1;
        positions.push(i - shift + 1, 1 + shift);
        shift += 1;
        shiftOrigin += 1;
        eol += 1;
        return p4.slice(0, len);
      }
      return p4;
    }
    if (p5) {
      shiftOrigin += 1;
      eol += 1;
      return p5.replace("\n", "");
    }
    if (p6) {
      const len = p6.length - 2;
      positions.push(i - shift + len, 1 + shift);
      shift += 1;
      shiftOrigin += 1;
      eol += 1;
      return p6.slice(0, -2);
    }
    if (p7) {
      const len = p7.length - 1;
      positions.push(i - shift + len, shift);
      shiftOrigin += 1;
      eol += 1;
      return p7.slice(0, -1);
    }
    if (p8) {
      positions.push(i - shift + 1, shift - 1);
      shift -= 1;
      shiftOrigin += 1;
      eol += 1;
      return " ";
    }
    if (i + eol === ((_c = syllablePositions[syllableIndex]) == null ? void 0 : _c[1])) {
      const newCharLen = syllablePositions[syllableIndex][0] - 1;
      ++syllableIndex;
      for (let j = 1; j <= newCharLen; j++) {
        positions.push(i - (shift - j), shift - j);
      }
      shift -= newCharLen;
      shiftOrigin += newCharLen;
    }
    return p9;
  });
  positions.push(normalized.length, shift);
  const starts = new Uint32Array(positions.length >> 1);
  const shifts = new Int32Array(positions.length >> 1);
  for (let i = 0, ii = positions.length; i < ii; i += 2) {
    starts[i >> 1] = positions[i];
    shifts[i >> 1] = positions[i + 1];
  }
  return [normalized, [starts, shifts], hasDiacritics];
}
function getOriginalIndex(diffs, pos, len) {
  if (!diffs) {
    return [pos, len];
  }
  const [starts, shifts] = diffs;
  const start = pos;
  const end = pos + len - 1;
  let i = binarySearchFirstItem(starts, (x) => x >= start);
  if (starts[i] > start) {
    --i;
  }
  let j = binarySearchFirstItem(starts, (x) => x >= end, i);
  if (starts[j] > end) {
    --j;
  }
  const oldStart = start + shifts[i];
  const oldEnd = end + shifts[j];
  const oldLen = oldEnd + 1 - oldStart;
  return [oldStart, oldLen];
}
class PDFFindController {
  constructor({
    linkService,
    eventBus,
    updateMatchesCountOnProgress = true
  }) {
    __privateAdd(this, _PDFFindController_instances);
    __privateAdd(this, _state, null);
    __privateAdd(this, _updateMatchesCountOnProgress, true);
    __privateAdd(this, _visitedPagesCount, 0);
    this._linkService = linkService;
    this._eventBus = eventBus;
    __privateSet(this, _updateMatchesCountOnProgress, updateMatchesCountOnProgress);
    this.onIsPageVisible = null;
    __privateMethod(this, _PDFFindController_instances, reset_fn2).call(this);
    eventBus._on("find", __privateMethod(this, _PDFFindController_instances, onFind_fn).bind(this));
    eventBus._on("findbarclose", __privateMethod(this, _PDFFindController_instances, onFindBarClose_fn).bind(this));
  }
  get highlightMatches() {
    return this._highlightMatches;
  }
  get pageMatches() {
    return this._pageMatches;
  }
  get pageMatchesLength() {
    return this._pageMatchesLength;
  }
  get selected() {
    return this._selected;
  }
  get state() {
    return __privateGet(this, _state);
  }
  setDocument(pdfDocument) {
    if (this._pdfDocument) {
      __privateMethod(this, _PDFFindController_instances, reset_fn2).call(this);
    }
    if (!pdfDocument) {
      return;
    }
    this._pdfDocument = pdfDocument;
    this._firstPageCapability.resolve();
  }
  scrollMatchIntoView({
    element = null,
    selectedLeft = 0,
    pageIndex = -1,
    matchIndex = -1
  }) {
    if (!this._scrollMatches || !element) {
      return;
    } else if (matchIndex === -1 || matchIndex !== this._selected.matchIdx) {
      return;
    } else if (pageIndex === -1 || pageIndex !== this._selected.pageIdx) {
      return;
    }
    this._scrollMatches = false;
    const spot = {
      top: MATCH_SCROLL_OFFSET_TOP,
      left: selectedLeft + MATCH_SCROLL_OFFSET_LEFT
    };
    scrollIntoView(element, spot, true);
  }
  match(query, pageContent, pageIndex) {
    const hasDiacritics = this._hasDiacritics[pageIndex];
    let isUnicode = false;
    if (typeof query === "string") {
      [isUnicode, query] = __privateMethod(this, _PDFFindController_instances, convertToRegExpString_fn).call(this, query, hasDiacritics);
    } else {
      query = query.sort().reverse().map((q) => {
        const [isUnicodePart, queryPart] = __privateMethod(this, _PDFFindController_instances, convertToRegExpString_fn).call(this, q, hasDiacritics);
        isUnicode || (isUnicode = isUnicodePart);
        return `(${queryPart})`;
      }).join("|");
    }
    if (!query) {
      return void 0;
    }
    const {
      caseSensitive,
      entireWord
    } = __privateGet(this, _state);
    const flags = `g${isUnicode ? "u" : ""}${caseSensitive ? "" : "i"}`;
    query = new RegExp(query, flags);
    const matches = [];
    let match2;
    while ((match2 = query.exec(pageContent)) !== null) {
      if (entireWord && !__privateMethod(this, _PDFFindController_instances, isEntireWord_fn).call(this, pageContent, match2.index, match2[0].length)) {
        continue;
      }
      matches.push({
        index: match2.index,
        length: match2[0].length
      });
    }
    return matches;
  }
}
_state = new WeakMap();
_updateMatchesCountOnProgress = new WeakMap();
_visitedPagesCount = new WeakMap();
_PDFFindController_instances = new WeakSet();
onFind_fn = function(state) {
  if (!state) {
    return;
  }
  const pdfDocument = this._pdfDocument;
  const {
    type
  } = state;
  if (__privateGet(this, _state) === null || __privateMethod(this, _PDFFindController_instances, shouldDirtyMatch_fn).call(this, state)) {
    this._dirtyMatch = true;
  }
  __privateSet(this, _state, state);
  if (type !== "highlightallchange") {
    __privateMethod(this, _PDFFindController_instances, updateUIState_fn2).call(this, FindState.PENDING);
  }
  this._firstPageCapability.promise.then(() => {
    if (!this._pdfDocument || pdfDocument && this._pdfDocument !== pdfDocument) {
      return;
    }
    __privateMethod(this, _PDFFindController_instances, extractText_fn).call(this);
    const findbarClosed = !this._highlightMatches;
    const pendingTimeout = !!this._findTimeout;
    if (this._findTimeout) {
      clearTimeout(this._findTimeout);
      this._findTimeout = null;
    }
    if (!type) {
      this._findTimeout = setTimeout(() => {
        __privateMethod(this, _PDFFindController_instances, nextMatch_fn).call(this);
        this._findTimeout = null;
      }, FIND_TIMEOUT);
    } else if (this._dirtyMatch) {
      __privateMethod(this, _PDFFindController_instances, nextMatch_fn).call(this);
    } else if (type === "again") {
      __privateMethod(this, _PDFFindController_instances, nextMatch_fn).call(this);
      if (findbarClosed && __privateGet(this, _state).highlightAll) {
        __privateMethod(this, _PDFFindController_instances, updateAllPages_fn).call(this);
      }
    } else if (type === "highlightallchange") {
      if (pendingTimeout) {
        __privateMethod(this, _PDFFindController_instances, nextMatch_fn).call(this);
      } else {
        this._highlightMatches = true;
      }
      __privateMethod(this, _PDFFindController_instances, updateAllPages_fn).call(this);
    } else {
      __privateMethod(this, _PDFFindController_instances, nextMatch_fn).call(this);
    }
  });
};
reset_fn2 = function() {
  this._highlightMatches = false;
  this._scrollMatches = false;
  this._pdfDocument = null;
  this._pageMatches = [];
  this._pageMatchesLength = [];
  __privateSet(this, _visitedPagesCount, 0);
  __privateSet(this, _state, null);
  this._selected = {
    pageIdx: -1,
    matchIdx: -1
  };
  this._offset = {
    pageIdx: null,
    matchIdx: null,
    wrapped: false
  };
  this._extractTextPromises = [];
  this._pageContents = [];
  this._pageDiffs = [];
  this._hasDiacritics = [];
  this._matchesCountTotal = 0;
  this._pagesToSearch = null;
  this._pendingFindMatches = /* @__PURE__ */ new Set();
  this._resumePageIdx = null;
  this._dirtyMatch = false;
  clearTimeout(this._findTimeout);
  this._findTimeout = null;
  this._firstPageCapability = Promise.withResolvers();
};
query_get = function() {
  const {
    query
  } = __privateGet(this, _state);
  if (typeof query === "string") {
    if (query !== this._rawQuery) {
      this._rawQuery = query;
      [this._normalizedQuery] = normalize(query);
    }
    return this._normalizedQuery;
  }
  return (query || []).filter((q) => !!q).map((q) => normalize(q)[0]);
};
shouldDirtyMatch_fn = function(state) {
  var _a2, _b;
  const newQuery = state.query, prevQuery = __privateGet(this, _state).query;
  const newType = typeof newQuery, prevType = typeof prevQuery;
  if (newType !== prevType) {
    return true;
  }
  if (newType === "string") {
    if (newQuery !== prevQuery) {
      return true;
    }
  } else if (JSON.stringify(newQuery) !== JSON.stringify(prevQuery)) {
    return true;
  }
  switch (state.type) {
    case "again":
      const pageNumber = this._selected.pageIdx + 1;
      const linkService = this._linkService;
      return pageNumber >= 1 && pageNumber <= linkService.pagesCount && pageNumber !== linkService.page && !((_b = (_a2 = this.onIsPageVisible) == null ? void 0 : _a2.call(this, pageNumber)) != null ? _b : true);
    case "highlightallchange":
      return false;
  }
  return true;
};
isEntireWord_fn = function(content, startIdx, length) {
  let match2 = content.slice(0, startIdx).match(NOT_DIACRITIC_FROM_END_REG_EXP);
  if (match2) {
    const first = content.charCodeAt(startIdx);
    const limit = match2[1].charCodeAt(0);
    if (getCharacterType(first) === getCharacterType(limit)) {
      return false;
    }
  }
  match2 = content.slice(startIdx + length).match(NOT_DIACRITIC_FROM_START_REG_EXP);
  if (match2) {
    const last = content.charCodeAt(startIdx + length - 1);
    const limit = match2[1].charCodeAt(0);
    if (getCharacterType(last) === getCharacterType(limit)) {
      return false;
    }
  }
  return true;
};
convertToRegExpString_fn = function(query, hasDiacritics) {
  const {
    matchDiacritics
  } = __privateGet(this, _state);
  let isUnicode = false;
  query = query.replaceAll(SPECIAL_CHARS_REG_EXP, (match2, p1, p2, p3, p4, p5) => {
    if (p1) {
      return `[ ]*\\${p1}[ ]*`;
    }
    if (p2) {
      return `[ ]*${p2}[ ]*`;
    }
    if (p3) {
      return "[ ]+";
    }
    if (matchDiacritics) {
      return p4 || p5;
    }
    if (p4) {
      return DIACRITICS_EXCEPTION.has(p4.charCodeAt(0)) ? p4 : "";
    }
    if (hasDiacritics) {
      isUnicode = true;
      return `${p5}\\p{M}*`;
    }
    return p5;
  });
  const trailingSpaces = "[ ]*";
  if (query.endsWith(trailingSpaces)) {
    query = query.slice(0, query.length - trailingSpaces.length);
  }
  if (matchDiacritics) {
    if (hasDiacritics) {
      DIACRITICS_EXCEPTION_STR || (DIACRITICS_EXCEPTION_STR = String.fromCharCode(...DIACRITICS_EXCEPTION));
      isUnicode = true;
      query = `${query}(?=[${DIACRITICS_EXCEPTION_STR}]|[^\\p{M}]|$)`;
    }
  }
  return [isUnicode, query];
};
calculateMatch_fn = function(pageIndex) {
  const query = __privateGet(this, _PDFFindController_instances, query_get);
  if (query.length === 0) {
    return;
  }
  const pageContent = this._pageContents[pageIndex];
  const matcherResult = this.match(query, pageContent, pageIndex);
  const matches = this._pageMatches[pageIndex] = [];
  const matchesLength = this._pageMatchesLength[pageIndex] = [];
  const diffs = this._pageDiffs[pageIndex];
  matcherResult == null ? void 0 : matcherResult.forEach(({
    index,
    length
  }) => {
    const [matchPos, matchLen] = getOriginalIndex(diffs, index, length);
    if (matchLen) {
      matches.push(matchPos);
      matchesLength.push(matchLen);
    }
  });
  if (__privateGet(this, _state).highlightAll) {
    __privateMethod(this, _PDFFindController_instances, updatePage_fn).call(this, pageIndex);
  }
  if (this._resumePageIdx === pageIndex) {
    this._resumePageIdx = null;
    __privateMethod(this, _PDFFindController_instances, nextPageMatch_fn).call(this);
  }
  const pageMatchesCount = matches.length;
  this._matchesCountTotal += pageMatchesCount;
  if (__privateGet(this, _updateMatchesCountOnProgress)) {
    if (pageMatchesCount > 0) {
      __privateMethod(this, _PDFFindController_instances, updateUIResultsCount_fn).call(this);
    }
  } else if (++__privateWrapper(this, _visitedPagesCount)._ === this._linkService.pagesCount) {
    __privateMethod(this, _PDFFindController_instances, updateUIResultsCount_fn).call(this);
  }
};
extractText_fn = function() {
  if (this._extractTextPromises.length > 0) {
    return;
  }
  let deferred = Promise.resolve();
  const textOptions = {
    disableNormalization: true
  };
  for (let i = 0, ii = this._linkService.pagesCount; i < ii; i++) {
    const {
      promise,
      resolve
    } = Promise.withResolvers();
    this._extractTextPromises[i] = promise;
    deferred = deferred.then(() => {
      return this._pdfDocument.getPage(i + 1).then((pdfPage) => pdfPage.getTextContent(textOptions)).then((textContent) => {
        const strBuf = [];
        for (const textItem of textContent.items) {
          strBuf.push(textItem.str);
          if (textItem.hasEOL) {
            strBuf.push("\n");
          }
        }
        [this._pageContents[i], this._pageDiffs[i], this._hasDiacritics[i]] = normalize(strBuf.join(""));
        resolve();
      }, (reason) => {
        console.error(`Unable to get text content for page ${i + 1}`, reason);
        this._pageContents[i] = "";
        this._pageDiffs[i] = null;
        this._hasDiacritics[i] = false;
        resolve();
      });
    });
  }
};
updatePage_fn = function(index) {
  if (this._scrollMatches && this._selected.pageIdx === index) {
    this._linkService.page = index + 1;
  }
  this._eventBus.dispatch("updatetextlayermatches", {
    source: this,
    pageIndex: index
  });
};
updateAllPages_fn = function() {
  this._eventBus.dispatch("updatetextlayermatches", {
    source: this,
    pageIndex: -1
  });
};
nextMatch_fn = function() {
  const previous = __privateGet(this, _state).findPrevious;
  const currentPageIndex = this._linkService.page - 1;
  const numPages = this._linkService.pagesCount;
  this._highlightMatches = true;
  if (this._dirtyMatch) {
    this._dirtyMatch = false;
    this._selected.pageIdx = this._selected.matchIdx = -1;
    this._offset.pageIdx = currentPageIndex;
    this._offset.matchIdx = null;
    this._offset.wrapped = false;
    this._resumePageIdx = null;
    this._pageMatches.length = 0;
    this._pageMatchesLength.length = 0;
    __privateSet(this, _visitedPagesCount, 0);
    this._matchesCountTotal = 0;
    __privateMethod(this, _PDFFindController_instances, updateAllPages_fn).call(this);
    for (let i = 0; i < numPages; i++) {
      if (this._pendingFindMatches.has(i)) {
        continue;
      }
      this._pendingFindMatches.add(i);
      this._extractTextPromises[i].then(() => {
        this._pendingFindMatches.delete(i);
        __privateMethod(this, _PDFFindController_instances, calculateMatch_fn).call(this, i);
      });
    }
  }
  const query = __privateGet(this, _PDFFindController_instances, query_get);
  if (query.length === 0) {
    __privateMethod(this, _PDFFindController_instances, updateUIState_fn2).call(this, FindState.FOUND);
    return;
  }
  if (this._resumePageIdx) {
    return;
  }
  const offset = this._offset;
  this._pagesToSearch = numPages;
  if (offset.matchIdx !== null) {
    const numPageMatches = this._pageMatches[offset.pageIdx].length;
    if (!previous && offset.matchIdx + 1 < numPageMatches || previous && offset.matchIdx > 0) {
      offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;
      __privateMethod(this, _PDFFindController_instances, updateMatch_fn).call(this, true);
      return;
    }
    __privateMethod(this, _PDFFindController_instances, advanceOffsetPage_fn).call(this, previous);
  }
  __privateMethod(this, _PDFFindController_instances, nextPageMatch_fn).call(this);
};
matchesReady_fn = function(matches) {
  const offset = this._offset;
  const numMatches = matches.length;
  const previous = __privateGet(this, _state).findPrevious;
  if (numMatches) {
    offset.matchIdx = previous ? numMatches - 1 : 0;
    __privateMethod(this, _PDFFindController_instances, updateMatch_fn).call(this, true);
    return true;
  }
  __privateMethod(this, _PDFFindController_instances, advanceOffsetPage_fn).call(this, previous);
  if (offset.wrapped) {
    offset.matchIdx = null;
    if (this._pagesToSearch < 0) {
      __privateMethod(this, _PDFFindController_instances, updateMatch_fn).call(this, false);
      return true;
    }
  }
  return false;
};
nextPageMatch_fn = function() {
  if (this._resumePageIdx !== null) {
    console.error("There can only be one pending page.");
  }
  let matches = null;
  do {
    const pageIdx = this._offset.pageIdx;
    matches = this._pageMatches[pageIdx];
    if (!matches) {
      this._resumePageIdx = pageIdx;
      break;
    }
  } while (!__privateMethod(this, _PDFFindController_instances, matchesReady_fn).call(this, matches));
};
advanceOffsetPage_fn = function(previous) {
  const offset = this._offset;
  const numPages = this._linkService.pagesCount;
  offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
  offset.matchIdx = null;
  this._pagesToSearch--;
  if (offset.pageIdx >= numPages || offset.pageIdx < 0) {
    offset.pageIdx = previous ? numPages - 1 : 0;
    offset.wrapped = true;
  }
};
updateMatch_fn = function(found = false) {
  let state = FindState.NOT_FOUND;
  const wrapped = this._offset.wrapped;
  this._offset.wrapped = false;
  if (found) {
    const previousPage = this._selected.pageIdx;
    this._selected.pageIdx = this._offset.pageIdx;
    this._selected.matchIdx = this._offset.matchIdx;
    state = wrapped ? FindState.WRAPPED : FindState.FOUND;
    if (previousPage !== -1 && previousPage !== this._selected.pageIdx) {
      __privateMethod(this, _PDFFindController_instances, updatePage_fn).call(this, previousPage);
    }
  }
  __privateMethod(this, _PDFFindController_instances, updateUIState_fn2).call(this, state, __privateGet(this, _state).findPrevious);
  if (this._selected.pageIdx !== -1) {
    this._scrollMatches = true;
    __privateMethod(this, _PDFFindController_instances, updatePage_fn).call(this, this._selected.pageIdx);
  }
};
onFindBarClose_fn = function(evt) {
  const pdfDocument = this._pdfDocument;
  this._firstPageCapability.promise.then(() => {
    if (!this._pdfDocument || pdfDocument && this._pdfDocument !== pdfDocument) {
      return;
    }
    if (this._findTimeout) {
      clearTimeout(this._findTimeout);
      this._findTimeout = null;
    }
    if (this._resumePageIdx) {
      this._resumePageIdx = null;
      this._dirtyMatch = true;
    }
    __privateMethod(this, _PDFFindController_instances, updateUIState_fn2).call(this, FindState.FOUND);
    this._highlightMatches = false;
    __privateMethod(this, _PDFFindController_instances, updateAllPages_fn).call(this);
  });
};
requestMatchesCount_fn = function() {
  var _a2;
  const {
    pageIdx,
    matchIdx
  } = this._selected;
  let current = 0, total = this._matchesCountTotal;
  if (matchIdx !== -1) {
    for (let i = 0; i < pageIdx; i++) {
      current += ((_a2 = this._pageMatches[i]) == null ? void 0 : _a2.length) || 0;
    }
    current += matchIdx + 1;
  }
  if (current < 1 || current > total) {
    current = total = 0;
  }
  return {
    current,
    total
  };
};
updateUIResultsCount_fn = function() {
  this._eventBus.dispatch("updatefindmatchescount", {
    source: this,
    matchesCount: __privateMethod(this, _PDFFindController_instances, requestMatchesCount_fn).call(this)
  });
};
updateUIState_fn2 = function(state, previous = false) {
  var _a2, _b, _c, _d;
  if (!__privateGet(this, _updateMatchesCountOnProgress) && (__privateGet(this, _visitedPagesCount) !== this._linkService.pagesCount || state === FindState.PENDING)) {
    return;
  }
  this._eventBus.dispatch("updatefindcontrolstate", {
    source: this,
    state,
    previous,
    entireWord: (_b = (_a2 = __privateGet(this, _state)) == null ? void 0 : _a2.entireWord) != null ? _b : null,
    matchesCount: __privateMethod(this, _PDFFindController_instances, requestMatchesCount_fn).call(this),
    rawQuery: (_d = (_c = __privateGet(this, _state)) == null ? void 0 : _c.query) != null ? _d : null
  });
};
;
const MATCHES_COUNT_LIMIT = 1e3;
class PDFFindBar {
  constructor(options, mainContainer, eventBus) {
    __privateAdd(this, _PDFFindBar_instances);
    __privateAdd(this, _mainContainer2);
    __privateAdd(this, _resizeObserver, new ResizeObserver(__privateMethod(this, _PDFFindBar_instances, resizeObserverCallback_fn).bind(this)));
    this.opened = false;
    this.bar = options.bar;
    this.toggleButton = options.toggleButton;
    this.findField = options.findField;
    this.highlightAll = options.highlightAllCheckbox;
    this.caseSensitive = options.caseSensitiveCheckbox;
    this.matchDiacritics = options.matchDiacriticsCheckbox;
    this.entireWord = options.entireWordCheckbox;
    this.findMsg = options.findMsg;
    this.findResultsCount = options.findResultsCount;
    this.findPreviousButton = options.findPreviousButton;
    this.findNextButton = options.findNextButton;
    this.eventBus = eventBus;
    __privateSet(this, _mainContainer2, mainContainer);
    const checkedInputs = /* @__PURE__ */ new Map([[this.highlightAll, "highlightallchange"], [this.caseSensitive, "casesensitivitychange"], [this.entireWord, "entirewordchange"], [this.matchDiacritics, "diacriticmatchingchange"]]);
    this.toggleButton.addEventListener("click", () => {
      this.toggle();
    });
    this.findField.addEventListener("input", () => {
      this.dispatchEvent("");
    });
    this.bar.addEventListener("keydown", ({
      keyCode,
      shiftKey,
      target
    }) => {
      switch (keyCode) {
        case 13:
          if (target === this.findField) {
            this.dispatchEvent("again", shiftKey);
          } else if (checkedInputs.has(target)) {
            target.checked = !target.checked;
            this.dispatchEvent(checkedInputs.get(target));
          }
          break;
        case 27:
          this.close();
          break;
      }
    });
    this.findPreviousButton.addEventListener("click", () => {
      this.dispatchEvent("again", true);
    });
    this.findNextButton.addEventListener("click", () => {
      this.dispatchEvent("again", false);
    });
    for (const [elem, evtName] of checkedInputs) {
      elem.addEventListener("click", () => {
        this.dispatchEvent(evtName);
      });
    }
  }
  reset() {
    this.updateUIState();
  }
  dispatchEvent(type, findPrev = false) {
    this.eventBus.dispatch("find", {
      source: this,
      type,
      query: this.findField.value,
      caseSensitive: this.caseSensitive.checked,
      entireWord: this.entireWord.checked,
      highlightAll: this.highlightAll.checked,
      findPrevious: findPrev,
      matchDiacritics: this.matchDiacritics.checked
    });
  }
  updateUIState(state, previous, matchesCount) {
    const {
      findField,
      findMsg
    } = this;
    let findMsgId = "", status = "";
    switch (state) {
      case FindState.FOUND:
        break;
      case FindState.PENDING:
        status = "pending";
        break;
      case FindState.NOT_FOUND:
        findMsgId = "pdfjs-find-not-found";
        status = "notFound";
        break;
      case FindState.WRAPPED:
        findMsgId = previous ? "pdfjs-find-reached-top" : "pdfjs-find-reached-bottom";
        break;
    }
    findField.setAttribute("data-status", status);
    findField.setAttribute("aria-invalid", state === FindState.NOT_FOUND);
    findMsg.setAttribute("data-status", status);
    if (findMsgId) {
      findMsg.setAttribute("data-l10n-id", findMsgId);
    } else {
      findMsg.removeAttribute("data-l10n-id");
      findMsg.textContent = "";
    }
    this.updateResultsCount(matchesCount);
  }
  updateResultsCount({
    current = 0,
    total = 0
  } = {}) {
    const {
      findResultsCount
    } = this;
    if (total > 0) {
      const limit = MATCHES_COUNT_LIMIT;
      findResultsCount.setAttribute("data-l10n-id", total > limit ? "pdfjs-find-match-count-limit" : "pdfjs-find-match-count");
      findResultsCount.setAttribute("data-l10n-args", JSON.stringify({
        limit,
        current,
        total
      }));
    } else {
      findResultsCount.removeAttribute("data-l10n-id");
      findResultsCount.textContent = "";
    }
  }
  open() {
    if (!this.opened) {
      __privateGet(this, _resizeObserver).observe(__privateGet(this, _mainContainer2));
      __privateGet(this, _resizeObserver).observe(this.bar);
      this.opened = true;
      toggleExpandedBtn(this.toggleButton, true, this.bar);
    }
    this.findField.select();
    this.findField.focus();
  }
  close() {
    if (!this.opened) {
      return;
    }
    __privateGet(this, _resizeObserver).disconnect();
    this.opened = false;
    toggleExpandedBtn(this.toggleButton, false, this.bar);
    this.eventBus.dispatch("findbarclose", {
      source: this
    });
  }
  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }
}
_mainContainer2 = new WeakMap();
_resizeObserver = new WeakMap();
_PDFFindBar_instances = new WeakSet();
resizeObserverCallback_fn = function() {
  const {
    bar
  } = this;
  bar.classList.remove("wrapContainers");
  const findbarHeight = bar.clientHeight;
  const inputContainerHeight = bar.firstElementChild.clientHeight;
  if (findbarHeight > inputContainerHeight) {
    bar.classList.add("wrapContainers");
  }
};
;
const HASH_CHANGE_TIMEOUT = 1e3;
const POSITION_UPDATED_THRESHOLD = 50;
const UPDATE_VIEWAREA_TIMEOUT = 1e3;
function getCurrentHash() {
  return document.location.hash;
}
class PDFHistory {
  constructor({
    linkService,
    eventBus
  }) {
    __privateAdd(this, _PDFHistory_instances);
    __privateAdd(this, _eventAbortController, null);
    this.linkService = linkService;
    this.eventBus = eventBus;
    this._initialized = false;
    this._fingerprint = "";
    this.reset();
    this.eventBus._on("pagesinit", () => {
      this._isPagesLoaded = false;
      this.eventBus._on("pagesloaded", (evt) => {
        this._isPagesLoaded = !!evt.pagesCount;
      }, {
        once: true
      });
    });
  }
  initialize({
    fingerprint,
    resetHistory = false,
    updateUrl = false
  }) {
    if (!fingerprint || typeof fingerprint !== "string") {
      console.error('PDFHistory.initialize: The "fingerprint" must be a non-empty string.');
      return;
    }
    if (this._initialized) {
      this.reset();
    }
    const reInitialized = this._fingerprint !== "" && this._fingerprint !== fingerprint;
    this._fingerprint = fingerprint;
    this._updateUrl = updateUrl === true;
    this._initialized = true;
    __privateMethod(this, _PDFHistory_instances, bindEvents_fn).call(this);
    const state = window.history.state;
    this._popStateInProgress = false;
    this._blockHashChange = 0;
    this._currentHash = getCurrentHash();
    this._numPositionUpdates = 0;
    this._uid = this._maxUid = 0;
    this._destination = null;
    this._position = null;
    if (!__privateMethod(this, _PDFHistory_instances, isValidState_fn).call(this, state, true) || resetHistory) {
      const {
        hash,
        page,
        rotation
      } = __privateMethod(this, _PDFHistory_instances, parseCurrentHash_fn).call(this, true);
      if (!hash || reInitialized || resetHistory) {
        __privateMethod(this, _PDFHistory_instances, pushOrReplaceState_fn).call(this, null, true);
        return;
      }
      __privateMethod(this, _PDFHistory_instances, pushOrReplaceState_fn).call(this, {
        hash,
        page,
        rotation
      }, true);
      return;
    }
    const destination = state.destination;
    __privateMethod(this, _PDFHistory_instances, updateInternalState_fn).call(this, destination, state.uid, true);
    if (destination.rotation !== void 0) {
      this._initialRotation = destination.rotation;
    }
    if (destination.dest) {
      this._initialBookmark = JSON.stringify(destination.dest);
      this._destination.page = null;
    } else if (destination.hash) {
      this._initialBookmark = destination.hash;
    } else if (destination.page) {
      this._initialBookmark = `page=${destination.page}`;
    }
  }
  reset() {
    if (this._initialized) {
      __privateMethod(this, _PDFHistory_instances, pageHide_fn).call(this);
      this._initialized = false;
      __privateMethod(this, _PDFHistory_instances, unbindEvents_fn).call(this);
    }
    if (this._updateViewareaTimeout) {
      clearTimeout(this._updateViewareaTimeout);
      this._updateViewareaTimeout = null;
    }
    this._initialBookmark = null;
    this._initialRotation = null;
  }
  push({
    namedDest = null,
    explicitDest,
    pageNumber
  }) {
    if (!this._initialized) {
      return;
    }
    if (namedDest && typeof namedDest !== "string") {
      console.error(`PDFHistory.push: "${namedDest}" is not a valid namedDest parameter.`);
      return;
    } else if (!Array.isArray(explicitDest)) {
      console.error(`PDFHistory.push: "${explicitDest}" is not a valid explicitDest parameter.`);
      return;
    } else if (!__privateMethod(this, _PDFHistory_instances, isValidPage_fn).call(this, pageNumber)) {
      if (pageNumber !== null || this._destination) {
        console.error(`PDFHistory.push: "${pageNumber}" is not a valid pageNumber parameter.`);
        return;
      }
    }
    const hash = namedDest || JSON.stringify(explicitDest);
    if (!hash) {
      return;
    }
    let forceReplace = false;
    if (this._destination && (isDestHashesEqual(this._destination.hash, hash) || isDestArraysEqual(this._destination.dest, explicitDest))) {
      if (this._destination.page) {
        return;
      }
      forceReplace = true;
    }
    if (this._popStateInProgress && !forceReplace) {
      return;
    }
    __privateMethod(this, _PDFHistory_instances, pushOrReplaceState_fn).call(this, {
      dest: explicitDest,
      hash,
      page: pageNumber,
      rotation: this.linkService.rotation
    }, forceReplace);
    if (!this._popStateInProgress) {
      this._popStateInProgress = true;
      Promise.resolve().then(() => {
        this._popStateInProgress = false;
      });
    }
  }
  pushPage(pageNumber) {
    var _a2;
    if (!this._initialized) {
      return;
    }
    if (!__privateMethod(this, _PDFHistory_instances, isValidPage_fn).call(this, pageNumber)) {
      console.error(`PDFHistory.pushPage: "${pageNumber}" is not a valid page number.`);
      return;
    }
    if (((_a2 = this._destination) == null ? void 0 : _a2.page) === pageNumber) {
      return;
    }
    if (this._popStateInProgress) {
      return;
    }
    __privateMethod(this, _PDFHistory_instances, pushOrReplaceState_fn).call(this, {
      dest: null,
      hash: `page=${pageNumber}`,
      page: pageNumber,
      rotation: this.linkService.rotation
    });
    if (!this._popStateInProgress) {
      this._popStateInProgress = true;
      Promise.resolve().then(() => {
        this._popStateInProgress = false;
      });
    }
  }
  pushCurrentPosition() {
    if (!this._initialized || this._popStateInProgress) {
      return;
    }
    __privateMethod(this, _PDFHistory_instances, tryPushCurrentPosition_fn).call(this);
  }
  back() {
    if (!this._initialized || this._popStateInProgress) {
      return;
    }
    const state = window.history.state;
    if (__privateMethod(this, _PDFHistory_instances, isValidState_fn).call(this, state) && state.uid > 0) {
      window.history.back();
    }
  }
  forward() {
    if (!this._initialized || this._popStateInProgress) {
      return;
    }
    const state = window.history.state;
    if (__privateMethod(this, _PDFHistory_instances, isValidState_fn).call(this, state) && state.uid < this._maxUid) {
      window.history.forward();
    }
  }
  get popStateInProgress() {
    return this._initialized && (this._popStateInProgress || this._blockHashChange > 0);
  }
  get initialBookmark() {
    return this._initialized ? this._initialBookmark : null;
  }
  get initialRotation() {
    return this._initialized ? this._initialRotation : null;
  }
}
_eventAbortController = new WeakMap();
_PDFHistory_instances = new WeakSet();
pushOrReplaceState_fn = function(destination, forceReplace = false) {
  const shouldReplace = forceReplace || !this._destination;
  const newState = {
    fingerprint: this._fingerprint,
    uid: shouldReplace ? this._uid : this._uid + 1,
    destination
  };
  __privateMethod(this, _PDFHistory_instances, updateInternalState_fn).call(this, destination, newState.uid);
  let newUrl;
  if (this._updateUrl && (destination == null ? void 0 : destination.hash)) {
    const baseUrl = document.location.href.split("#", 1)[0];
    if (!baseUrl.startsWith("file://")) {
      newUrl = `${baseUrl}#${destination.hash}`;
    }
  }
  if (shouldReplace) {
    window.history.replaceState(newState, "", newUrl);
  } else {
    window.history.pushState(newState, "", newUrl);
  }
};
tryPushCurrentPosition_fn = function(temporary = false) {
  if (!this._position) {
    return;
  }
  let position = this._position;
  if (temporary) {
    position = Object.assign(/* @__PURE__ */ Object.create(null), this._position);
    position.temporary = true;
  }
  if (!this._destination) {
    __privateMethod(this, _PDFHistory_instances, pushOrReplaceState_fn).call(this, position);
    return;
  }
  if (this._destination.temporary) {
    __privateMethod(this, _PDFHistory_instances, pushOrReplaceState_fn).call(this, position, true);
    return;
  }
  if (this._destination.hash === position.hash) {
    return;
  }
  if (!this._destination.page && (POSITION_UPDATED_THRESHOLD <= 0 || this._numPositionUpdates <= POSITION_UPDATED_THRESHOLD)) {
    return;
  }
  let forceReplace = false;
  if (this._destination.page >= position.first && this._destination.page <= position.page) {
    if (this._destination.dest !== void 0 || !this._destination.first) {
      return;
    }
    forceReplace = true;
  }
  __privateMethod(this, _PDFHistory_instances, pushOrReplaceState_fn).call(this, position, forceReplace);
};
isValidPage_fn = function(val) {
  return Number.isInteger(val) && val > 0 && val <= this.linkService.pagesCount;
};
isValidState_fn = function(state, checkReload = false) {
  if (!state) {
    return false;
  }
  if (state.fingerprint !== this._fingerprint) {
    if (checkReload) {
      if (typeof state.fingerprint !== "string" || state.fingerprint.length !== this._fingerprint.length) {
        return false;
      }
      const [perfEntry] = performance.getEntriesByType("navigation");
      if ((perfEntry == null ? void 0 : perfEntry.type) !== "reload") {
        return false;
      }
    } else {
      return false;
    }
  }
  if (!Number.isInteger(state.uid) || state.uid < 0) {
    return false;
  }
  if (state.destination === null || typeof state.destination !== "object") {
    return false;
  }
  return true;
};
updateInternalState_fn = function(destination, uid, removeTemporary = false) {
  if (this._updateViewareaTimeout) {
    clearTimeout(this._updateViewareaTimeout);
    this._updateViewareaTimeout = null;
  }
  if (removeTemporary && (destination == null ? void 0 : destination.temporary)) {
    delete destination.temporary;
  }
  this._destination = destination;
  this._uid = uid;
  this._maxUid = Math.max(this._maxUid, uid);
  this._numPositionUpdates = 0;
};
parseCurrentHash_fn = function(checkNameddest = false) {
  const hash = unescape(getCurrentHash()).substring(1);
  const params = parseQueryString(hash);
  const nameddest = params.get("nameddest") || "";
  let page = params.get("page") | 0;
  if (!__privateMethod(this, _PDFHistory_instances, isValidPage_fn).call(this, page) || checkNameddest && nameddest.length > 0) {
    page = null;
  }
  return {
    hash,
    page,
    rotation: this.linkService.rotation
  };
};
updateViewarea_fn = function({
  location
}) {
  if (this._updateViewareaTimeout) {
    clearTimeout(this._updateViewareaTimeout);
    this._updateViewareaTimeout = null;
  }
  this._position = {
    hash: location.pdfOpenParams.substring(1),
    page: this.linkService.page,
    first: location.pageNumber,
    rotation: location.rotation
  };
  if (this._popStateInProgress) {
    return;
  }
  if (POSITION_UPDATED_THRESHOLD > 0 && this._isPagesLoaded && this._destination && !this._destination.page) {
    this._numPositionUpdates++;
  }
  if (UPDATE_VIEWAREA_TIMEOUT > 0) {
    this._updateViewareaTimeout = setTimeout(() => {
      if (!this._popStateInProgress) {
        __privateMethod(this, _PDFHistory_instances, tryPushCurrentPosition_fn).call(this, true);
      }
      this._updateViewareaTimeout = null;
    }, UPDATE_VIEWAREA_TIMEOUT);
  }
};
popState_fn = function({
  state
}) {
  const newHash = getCurrentHash(), hashChanged = this._currentHash !== newHash;
  this._currentHash = newHash;
  if (!state) {
    this._uid++;
    const {
      hash,
      page,
      rotation
    } = __privateMethod(this, _PDFHistory_instances, parseCurrentHash_fn).call(this);
    __privateMethod(this, _PDFHistory_instances, pushOrReplaceState_fn).call(this, {
      hash,
      page,
      rotation
    }, true);
    return;
  }
  if (!__privateMethod(this, _PDFHistory_instances, isValidState_fn).call(this, state)) {
    return;
  }
  this._popStateInProgress = true;
  if (hashChanged) {
    this._blockHashChange++;
    waitOnEventOrTimeout({
      target: window,
      name: "hashchange",
      delay: HASH_CHANGE_TIMEOUT
    }).then(() => {
      this._blockHashChange--;
    });
  }
  const destination = state.destination;
  __privateMethod(this, _PDFHistory_instances, updateInternalState_fn).call(this, destination, state.uid, true);
  if (isValidRotation(destination.rotation)) {
    this.linkService.rotation = destination.rotation;
  }
  if (destination.dest) {
    this.linkService.goToDestination(destination.dest);
  } else if (destination.hash) {
    this.linkService.setHash(destination.hash);
  } else if (destination.page) {
    this.linkService.page = destination.page;
  }
  Promise.resolve().then(() => {
    this._popStateInProgress = false;
  });
};
pageHide_fn = function() {
  if (!this._destination || this._destination.temporary) {
    __privateMethod(this, _PDFHistory_instances, tryPushCurrentPosition_fn).call(this);
  }
};
bindEvents_fn = function() {
  if (__privateGet(this, _eventAbortController)) {
    return;
  }
  __privateSet(this, _eventAbortController, new AbortController());
  const {
    signal
  } = __privateGet(this, _eventAbortController);
  this.eventBus._on("updateviewarea", __privateMethod(this, _PDFHistory_instances, updateViewarea_fn).bind(this), {
    signal
  });
  window.addEventListener("popstate", __privateMethod(this, _PDFHistory_instances, popState_fn).bind(this), {
    signal
  });
  window.addEventListener("pagehide", __privateMethod(this, _PDFHistory_instances, pageHide_fn).bind(this), {
    signal
  });
};
unbindEvents_fn = function() {
  var _a2;
  (_a2 = __privateGet(this, _eventAbortController)) == null ? void 0 : _a2.abort();
  __privateSet(this, _eventAbortController, null);
};
function isDestHashesEqual(destHash, pushHash) {
  if (typeof destHash !== "string" || typeof pushHash !== "string") {
    return false;
  }
  if (destHash === pushHash) {
    return true;
  }
  const nameddest = parseQueryString(destHash).get("nameddest");
  if (nameddest === pushHash) {
    return true;
  }
  return false;
}
function isDestArraysEqual(firstDest, secondDest) {
  function isEntryEqual(first, second) {
    if (typeof first !== typeof second) {
      return false;
    }
    if (Array.isArray(first) || Array.isArray(second)) {
      return false;
    }
    if (first !== null && typeof first === "object" && second !== null) {
      if (Object.keys(first).length !== Object.keys(second).length) {
        return false;
      }
      for (const key in first) {
        if (!isEntryEqual(first[key], second[key])) {
          return false;
        }
      }
      return true;
    }
    return first === second || Number.isNaN(first) && Number.isNaN(second);
  }
  if (!(Array.isArray(firstDest) && Array.isArray(secondDest))) {
    return false;
  }
  if (firstDest.length !== secondDest.length) {
    return false;
  }
  for (let i = 0, ii = firstDest.length; i < ii; i++) {
    if (!isEntryEqual(firstDest[i], secondDest[i])) {
      return false;
    }
  }
  return true;
}
;
class PDFLayerViewer extends BaseTreeViewer {
  constructor(options) {
    super(options);
    __privateAdd(this, _PDFLayerViewer_instances);
    this.eventBus._on("optionalcontentconfigchanged", (evt) => {
      __privateMethod(this, _PDFLayerViewer_instances, updateLayers_fn).call(this, evt.promise);
    });
    this.eventBus._on("resetlayers", () => {
      __privateMethod(this, _PDFLayerViewer_instances, updateLayers_fn).call(this);
    });
    this.eventBus._on("togglelayerstree", this._toggleAllTreeItems.bind(this));
  }
  reset() {
    var _a2;
    super.reset();
    this._optionalContentConfig = null;
    (_a2 = this._optionalContentVisibility) == null ? void 0 : _a2.clear();
    this._optionalContentVisibility = null;
  }
  _dispatchEvent(layersCount) {
    this.eventBus.dispatch("layersloaded", {
      source: this,
      layersCount
    });
  }
  _bindLink(element, {
    groupId,
    input
  }) {
    const setVisibility = () => {
      const visible = input.checked;
      this._optionalContentConfig.setVisibility(groupId, visible);
      const cached = this._optionalContentVisibility.get(groupId);
      if (cached) {
        cached.visible = visible;
      }
      this.eventBus.dispatch("optionalcontentconfig", {
        source: this,
        promise: Promise.resolve(this._optionalContentConfig)
      });
    };
    element.onclick = (evt) => {
      if (evt.target === input) {
        setVisibility();
        return true;
      } else if (evt.target !== element) {
        return true;
      }
      input.checked = !input.checked;
      setVisibility();
      return false;
    };
  }
  _setNestedName(element, {
    name = null
  }) {
    if (typeof name === "string") {
      element.textContent = this._normalizeTextContent(name);
      return;
    }
    element.setAttribute("data-l10n-id", "pdfjs-additional-layers");
    element.style.fontStyle = "italic";
    this._l10n.translateOnce(element);
  }
  _addToggleButton(div, {
    name = null
  }) {
    super._addToggleButton(div, name === null);
  }
  _toggleAllTreeItems() {
    if (!this._optionalContentConfig) {
      return;
    }
    super._toggleAllTreeItems();
  }
  render({
    optionalContentConfig,
    pdfDocument
  }) {
    if (this._optionalContentConfig) {
      this.reset();
    }
    this._optionalContentConfig = optionalContentConfig || null;
    this._pdfDocument = pdfDocument || null;
    const groups = optionalContentConfig == null ? void 0 : optionalContentConfig.getOrder();
    if (!groups) {
      this._dispatchEvent(0);
      return;
    }
    this._optionalContentVisibility = /* @__PURE__ */ new Map();
    const fragment = document.createDocumentFragment(), queue = [{
      parent: fragment,
      groups
    }];
    let layersCount = 0, hasAnyNesting = false;
    while (queue.length > 0) {
      const levelData = queue.shift();
      for (const groupId of levelData.groups) {
        const div = document.createElement("div");
        div.className = "treeItem";
        const element = document.createElement("a");
        div.append(element);
        if (typeof groupId === "object") {
          hasAnyNesting = true;
          this._addToggleButton(div, groupId);
          this._setNestedName(element, groupId);
          const itemsDiv = document.createElement("div");
          itemsDiv.className = "treeItems";
          div.append(itemsDiv);
          queue.push({
            parent: itemsDiv,
            groups: groupId.order
          });
        } else {
          const group = optionalContentConfig.getGroup(groupId);
          const input = document.createElement("input");
          this._bindLink(element, {
            groupId,
            input
          });
          input.type = "checkbox";
          input.checked = group.visible;
          this._optionalContentVisibility.set(groupId, {
            input,
            visible: input.checked
          });
          const label = document.createElement("label");
          label.textContent = this._normalizeTextContent(group.name);
          label.append(input);
          element.append(label);
          layersCount++;
        }
        levelData.parent.append(div);
      }
    }
    this._finishRendering(fragment, layersCount, hasAnyNesting);
  }
}
_PDFLayerViewer_instances = new WeakSet();
updateLayers_fn = async function(promise = null) {
  if (!this._optionalContentConfig) {
    return;
  }
  const pdfDocument = this._pdfDocument;
  const optionalContentConfig = await (promise || pdfDocument.getOptionalContentConfig({
    intent: "display"
  }));
  if (pdfDocument !== this._pdfDocument) {
    return;
  }
  if (promise) {
    for (const [groupId, cached] of this._optionalContentVisibility) {
      const group = optionalContentConfig.getGroup(groupId);
      if (group && cached.visible !== group.visible) {
        cached.input.checked = cached.visible = !cached.visible;
      }
    }
    return;
  }
  this.eventBus.dispatch("optionalcontentconfig", {
    source: this,
    promise: Promise.resolve(optionalContentConfig)
  });
  this.render({
    optionalContentConfig,
    pdfDocument: this._pdfDocument
  });
};
;
class PDFOutlineViewer extends BaseTreeViewer {
  constructor(options) {
    super(options);
    this.linkService = options.linkService;
    this.downloadManager = options.downloadManager;
    this.eventBus._on("toggleoutlinetree", this._toggleAllTreeItems.bind(this));
    this.eventBus._on("currentoutlineitem", this._currentOutlineItem.bind(this));
    this.eventBus._on("pagechanging", (evt) => {
      this._currentPageNumber = evt.pageNumber;
    });
    this.eventBus._on("pagesloaded", (evt) => {
      var _a2;
      this._isPagesLoaded = !!evt.pagesCount;
      (_a2 = this._currentOutlineItemCapability) == null ? void 0 : _a2.resolve(this._isPagesLoaded);
    });
    this.eventBus._on("sidebarviewchanged", (evt) => {
      this._sidebarView = evt.view;
    });
  }
  reset() {
    var _a2;
    super.reset();
    this._outline = null;
    this._pageNumberToDestHashCapability = null;
    this._currentPageNumber = 1;
    this._isPagesLoaded = null;
    (_a2 = this._currentOutlineItemCapability) == null ? void 0 : _a2.resolve(false);
    this._currentOutlineItemCapability = null;
  }
  _dispatchEvent(outlineCount) {
    var _a2;
    this._currentOutlineItemCapability = Promise.withResolvers();
    if (outlineCount === 0 || ((_a2 = this._pdfDocument) == null ? void 0 : _a2.loadingParams.disableAutoFetch)) {
      this._currentOutlineItemCapability.resolve(false);
    } else if (this._isPagesLoaded !== null) {
      this._currentOutlineItemCapability.resolve(this._isPagesLoaded);
    }
    this.eventBus.dispatch("outlineloaded", {
      source: this,
      outlineCount,
      currentOutlineItemPromise: this._currentOutlineItemCapability.promise
    });
  }
  _bindLink(element, {
    url,
    newWindow,
    action,
    attachment,
    dest,
    setOCGState
  }) {
    const {
      linkService
    } = this;
    if (url) {
      linkService.addLinkAttributes(element, url, newWindow);
      return;
    }
    if (action) {
      element.href = linkService.getAnchorUrl("");
      element.onclick = () => {
        linkService.executeNamedAction(action);
        return false;
      };
      return;
    }
    if (attachment) {
      element.href = linkService.getAnchorUrl("");
      element.onclick = () => {
        this.downloadManager.openOrDownloadData(attachment.content, attachment.filename);
        return false;
      };
      return;
    }
    if (setOCGState) {
      element.href = linkService.getAnchorUrl("");
      element.onclick = () => {
        linkService.executeSetOCGState(setOCGState);
        return false;
      };
      return;
    }
    element.href = linkService.getDestinationHash(dest);
    element.onclick = (evt) => {
      this._updateCurrentTreeItem(evt.target.parentNode);
      if (dest) {
        linkService.goToDestination(dest);
      }
      return false;
    };
  }
  _setStyles(element, {
    bold,
    italic
  }) {
    if (bold) {
      element.style.fontWeight = "bold";
    }
    if (italic) {
      element.style.fontStyle = "italic";
    }
  }
  _addToggleButton(div, {
    count,
    items
  }) {
    let hidden = false;
    if (count < 0) {
      let totalCount = items.length;
      if (totalCount > 0) {
        const queue = [...items];
        while (queue.length > 0) {
          const {
            count: nestedCount,
            items: nestedItems
          } = queue.shift();
          if (nestedCount > 0 && nestedItems.length > 0) {
            totalCount += nestedItems.length;
            queue.push(...nestedItems);
          }
        }
      }
      if (Math.abs(count) === totalCount) {
        hidden = true;
      }
    }
    super._addToggleButton(div, hidden);
  }
  _toggleAllTreeItems() {
    if (!this._outline) {
      return;
    }
    super._toggleAllTreeItems();
  }
  render({
    outline,
    pdfDocument
  }) {
    if (this._outline) {
      this.reset();
    }
    this._outline = outline || null;
    this._pdfDocument = pdfDocument || null;
    if (!outline) {
      this._dispatchEvent(0);
      return;
    }
    const fragment = document.createDocumentFragment();
    const queue = [{
      parent: fragment,
      items: outline
    }];
    let outlineCount = 0, hasAnyNesting = false;
    while (queue.length > 0) {
      const levelData = queue.shift();
      for (const item of levelData.items) {
        const div = document.createElement("div");
        div.className = "treeItem";
        const element = document.createElement("a");
        this._bindLink(element, item);
        this._setStyles(element, item);
        element.textContent = this._normalizeTextContent(item.title);
        div.append(element);
        if (item.items.length > 0) {
          hasAnyNesting = true;
          this._addToggleButton(div, item);
          const itemsDiv = document.createElement("div");
          itemsDiv.className = "treeItems";
          div.append(itemsDiv);
          queue.push({
            parent: itemsDiv,
            items: item.items
          });
        }
        levelData.parent.append(div);
        outlineCount++;
      }
    }
    this._finishRendering(fragment, outlineCount, hasAnyNesting);
  }
  async _currentOutlineItem() {
    if (!this._isPagesLoaded) {
      throw new Error("_currentOutlineItem: All pages have not been loaded.");
    }
    if (!this._outline || !this._pdfDocument) {
      return;
    }
    const pageNumberToDestHash = await this._getPageNumberToDestHash(this._pdfDocument);
    if (!pageNumberToDestHash) {
      return;
    }
    this._updateCurrentTreeItem(null);
    if (this._sidebarView !== SidebarView.OUTLINE) {
      return;
    }
    for (let i = this._currentPageNumber; i > 0; i--) {
      const destHash = pageNumberToDestHash.get(i);
      if (!destHash) {
        continue;
      }
      const linkElement = this.container.querySelector(`a[href="${destHash}"]`);
      if (!linkElement) {
        continue;
      }
      this._scrollToCurrentTreeItem(linkElement.parentNode);
      break;
    }
  }
  async _getPageNumberToDestHash(pdfDocument) {
    if (this._pageNumberToDestHashCapability) {
      return this._pageNumberToDestHashCapability.promise;
    }
    this._pageNumberToDestHashCapability = Promise.withResolvers();
    const pageNumberToDestHash = /* @__PURE__ */ new Map(), pageNumberNesting = /* @__PURE__ */ new Map();
    const queue = [{
      nesting: 0,
      items: this._outline
    }];
    while (queue.length > 0) {
      const levelData = queue.shift(), currentNesting = levelData.nesting;
      for (const {
        dest,
        items
      } of levelData.items) {
        let explicitDest, pageNumber;
        if (typeof dest === "string") {
          explicitDest = await pdfDocument.getDestination(dest);
          if (pdfDocument !== this._pdfDocument) {
            return null;
          }
        } else {
          explicitDest = dest;
        }
        if (Array.isArray(explicitDest)) {
          const [destRef] = explicitDest;
          if (destRef && typeof destRef === "object") {
            pageNumber = pdfDocument.cachedPageNumber(destRef);
          } else if (Number.isInteger(destRef)) {
            pageNumber = destRef + 1;
          }
          if (Number.isInteger(pageNumber) && (!pageNumberToDestHash.has(pageNumber) || currentNesting > pageNumberNesting.get(pageNumber))) {
            const destHash = this.linkService.getDestinationHash(dest);
            pageNumberToDestHash.set(pageNumber, destHash);
            pageNumberNesting.set(pageNumber, currentNesting);
          }
        }
        if (items.length > 0) {
          queue.push({
            nesting: currentNesting + 1,
            items
          });
        }
      }
    }
    this._pageNumberToDestHashCapability.resolve(pageNumberToDestHash.size > 0 ? pageNumberToDestHash : null);
    return this._pageNumberToDestHashCapability.promise;
  }
}
;
const DELAY_BEFORE_HIDING_CONTROLS = 3e3;
const ACTIVE_SELECTOR = "pdfPresentationMode";
const CONTROLS_SELECTOR = "pdfPresentationModeControls";
const MOUSE_SCROLL_COOLDOWN_TIME = 50;
const PAGE_SWITCH_THRESHOLD = 0.1;
const SWIPE_MIN_DISTANCE_THRESHOLD = 50;
const SWIPE_ANGLE_THRESHOLD = Math.PI / 6;
class PDFPresentationMode {
  constructor({
    container,
    pdfViewer,
    eventBus
  }) {
    __privateAdd(this, _PDFPresentationMode_instances);
    __privateAdd(this, _state2, PresentationModeState.UNKNOWN);
    __privateAdd(this, _args, null);
    __privateAdd(this, _fullscreenChangeAbortController, null);
    __privateAdd(this, _windowAbortController, null);
    this.container = container;
    this.pdfViewer = pdfViewer;
    this.eventBus = eventBus;
    this.contextMenuOpen = false;
    this.mouseScrollTimeStamp = 0;
    this.mouseScrollDelta = 0;
    this.touchSwipeState = null;
  }
  async request() {
    const {
      container,
      pdfViewer
    } = this;
    if (this.active || !pdfViewer.pagesCount || !container.requestFullscreen) {
      return false;
    }
    __privateMethod(this, _PDFPresentationMode_instances, addFullscreenChangeListeners_fn).call(this);
    __privateMethod(this, _PDFPresentationMode_instances, notifyStateChange_fn).call(this, PresentationModeState.CHANGING);
    const promise = container.requestFullscreen();
    __privateSet(this, _args, {
      pageNumber: pdfViewer.currentPageNumber,
      scaleValue: pdfViewer.currentScaleValue,
      scrollMode: pdfViewer.scrollMode,
      spreadMode: null,
      annotationEditorMode: null
    });
    if (pdfViewer.spreadMode !== SpreadMode.NONE && !(pdfViewer.pageViewsReady && pdfViewer.hasEqualPageSizes)) {
      console.warn("Ignoring Spread modes when entering PresentationMode, since the document may contain varying page sizes.");
      __privateGet(this, _args).spreadMode = pdfViewer.spreadMode;
    }
    if (pdfViewer.annotationEditorMode !== AnnotationEditorType.DISABLE) {
      __privateGet(this, _args).annotationEditorMode = pdfViewer.annotationEditorMode;
    }
    try {
      await promise;
      pdfViewer.focus();
      return true;
    } catch {
      __privateMethod(this, _PDFPresentationMode_instances, removeFullscreenChangeListeners_fn).call(this);
      __privateMethod(this, _PDFPresentationMode_instances, notifyStateChange_fn).call(this, PresentationModeState.NORMAL);
    }
    return false;
  }
  get active() {
    return __privateGet(this, _state2) === PresentationModeState.CHANGING || __privateGet(this, _state2) === PresentationModeState.FULLSCREEN;
  }
}
_state2 = new WeakMap();
_args = new WeakMap();
_fullscreenChangeAbortController = new WeakMap();
_windowAbortController = new WeakMap();
_PDFPresentationMode_instances = new WeakSet();
mouseWheel_fn = function(evt) {
  if (!this.active) {
    return;
  }
  evt.preventDefault();
  const delta = normalizeWheelEventDelta(evt);
  const currentTime = Date.now();
  const storedTime = this.mouseScrollTimeStamp;
  if (currentTime > storedTime && currentTime - storedTime < MOUSE_SCROLL_COOLDOWN_TIME) {
    return;
  }
  if (this.mouseScrollDelta > 0 && delta < 0 || this.mouseScrollDelta < 0 && delta > 0) {
    __privateMethod(this, _PDFPresentationMode_instances, resetMouseScrollState_fn).call(this);
  }
  this.mouseScrollDelta += delta;
  if (Math.abs(this.mouseScrollDelta) >= PAGE_SWITCH_THRESHOLD) {
    const totalDelta = this.mouseScrollDelta;
    __privateMethod(this, _PDFPresentationMode_instances, resetMouseScrollState_fn).call(this);
    const success = totalDelta > 0 ? this.pdfViewer.previousPage() : this.pdfViewer.nextPage();
    if (success) {
      this.mouseScrollTimeStamp = currentTime;
    }
  }
};
notifyStateChange_fn = function(state) {
  __privateSet(this, _state2, state);
  this.eventBus.dispatch("presentationmodechanged", {
    source: this,
    state
  });
};
enter_fn = function() {
  __privateMethod(this, _PDFPresentationMode_instances, notifyStateChange_fn).call(this, PresentationModeState.FULLSCREEN);
  this.container.classList.add(ACTIVE_SELECTOR);
  setTimeout(() => {
    this.pdfViewer.scrollMode = ScrollMode.PAGE;
    if (__privateGet(this, _args).spreadMode !== null) {
      this.pdfViewer.spreadMode = SpreadMode.NONE;
    }
    this.pdfViewer.currentPageNumber = __privateGet(this, _args).pageNumber;
    this.pdfViewer.currentScaleValue = "page-fit";
    if (__privateGet(this, _args).annotationEditorMode !== null) {
      this.pdfViewer.annotationEditorMode = {
        mode: AnnotationEditorType.NONE
      };
    }
  }, 0);
  __privateMethod(this, _PDFPresentationMode_instances, addWindowListeners_fn).call(this);
  __privateMethod(this, _PDFPresentationMode_instances, showControls_fn).call(this);
  this.contextMenuOpen = false;
  document.getSelection().empty();
};
exit_fn = function() {
  const pageNumber = this.pdfViewer.currentPageNumber;
  this.container.classList.remove(ACTIVE_SELECTOR);
  setTimeout(() => {
    __privateMethod(this, _PDFPresentationMode_instances, removeFullscreenChangeListeners_fn).call(this);
    __privateMethod(this, _PDFPresentationMode_instances, notifyStateChange_fn).call(this, PresentationModeState.NORMAL);
    this.pdfViewer.scrollMode = __privateGet(this, _args).scrollMode;
    if (__privateGet(this, _args).spreadMode !== null) {
      this.pdfViewer.spreadMode = __privateGet(this, _args).spreadMode;
    }
    this.pdfViewer.currentScaleValue = __privateGet(this, _args).scaleValue;
    this.pdfViewer.currentPageNumber = pageNumber;
    if (__privateGet(this, _args).annotationEditorMode !== null) {
      this.pdfViewer.annotationEditorMode = {
        mode: __privateGet(this, _args).annotationEditorMode
      };
    }
    __privateSet(this, _args, null);
  }, 0);
  __privateMethod(this, _PDFPresentationMode_instances, removeWindowListeners_fn).call(this);
  __privateMethod(this, _PDFPresentationMode_instances, hideControls_fn).call(this);
  __privateMethod(this, _PDFPresentationMode_instances, resetMouseScrollState_fn).call(this);
  this.contextMenuOpen = false;
};
mouseDown_fn = function(evt) {
  var _a2;
  if (this.contextMenuOpen) {
    this.contextMenuOpen = false;
    evt.preventDefault();
    return;
  }
  if (evt.button !== 0) {
    return;
  }
  if (evt.target.href && ((_a2 = evt.target.parentNode) == null ? void 0 : _a2.hasAttribute("data-internal-link"))) {
    return;
  }
  evt.preventDefault();
  if (evt.shiftKey) {
    this.pdfViewer.previousPage();
  } else {
    this.pdfViewer.nextPage();
  }
};
contextMenu_fn = function() {
  this.contextMenuOpen = true;
};
showControls_fn = function() {
  if (this.controlsTimeout) {
    clearTimeout(this.controlsTimeout);
  } else {
    this.container.classList.add(CONTROLS_SELECTOR);
  }
  this.controlsTimeout = setTimeout(() => {
    this.container.classList.remove(CONTROLS_SELECTOR);
    delete this.controlsTimeout;
  }, DELAY_BEFORE_HIDING_CONTROLS);
};
hideControls_fn = function() {
  if (!this.controlsTimeout) {
    return;
  }
  clearTimeout(this.controlsTimeout);
  this.container.classList.remove(CONTROLS_SELECTOR);
  delete this.controlsTimeout;
};
resetMouseScrollState_fn = function() {
  this.mouseScrollTimeStamp = 0;
  this.mouseScrollDelta = 0;
};
touchSwipe_fn = function(evt) {
  if (!this.active) {
    return;
  }
  if (evt.touches.length > 1) {
    this.touchSwipeState = null;
    return;
  }
  switch (evt.type) {
    case "touchstart":
      this.touchSwipeState = {
        startX: evt.touches[0].pageX,
        startY: evt.touches[0].pageY,
        endX: evt.touches[0].pageX,
        endY: evt.touches[0].pageY
      };
      break;
    case "touchmove":
      if (this.touchSwipeState === null) {
        return;
      }
      this.touchSwipeState.endX = evt.touches[0].pageX;
      this.touchSwipeState.endY = evt.touches[0].pageY;
      evt.preventDefault();
      break;
    case "touchend":
      if (this.touchSwipeState === null) {
        return;
      }
      let delta = 0;
      const dx = this.touchSwipeState.endX - this.touchSwipeState.startX;
      const dy = this.touchSwipeState.endY - this.touchSwipeState.startY;
      const absAngle = Math.abs(Math.atan2(dy, dx));
      if (Math.abs(dx) > SWIPE_MIN_DISTANCE_THRESHOLD && (absAngle <= SWIPE_ANGLE_THRESHOLD || absAngle >= Math.PI - SWIPE_ANGLE_THRESHOLD)) {
        delta = dx;
      } else if (Math.abs(dy) > SWIPE_MIN_DISTANCE_THRESHOLD && Math.abs(absAngle - Math.PI / 2) <= SWIPE_ANGLE_THRESHOLD) {
        delta = dy;
      }
      if (delta > 0) {
        this.pdfViewer.previousPage();
      } else if (delta < 0) {
        this.pdfViewer.nextPage();
      }
      break;
  }
};
addWindowListeners_fn = function() {
  if (__privateGet(this, _windowAbortController)) {
    return;
  }
  __privateSet(this, _windowAbortController, new AbortController());
  const {
    signal
  } = __privateGet(this, _windowAbortController);
  const touchSwipeBind = __privateMethod(this, _PDFPresentationMode_instances, touchSwipe_fn).bind(this);
  window.addEventListener("mousemove", __privateMethod(this, _PDFPresentationMode_instances, showControls_fn).bind(this), {
    signal
  });
  window.addEventListener("mousedown", __privateMethod(this, _PDFPresentationMode_instances, mouseDown_fn).bind(this), {
    signal
  });
  window.addEventListener("wheel", __privateMethod(this, _PDFPresentationMode_instances, mouseWheel_fn).bind(this), {
    passive: false,
    signal
  });
  window.addEventListener("keydown", __privateMethod(this, _PDFPresentationMode_instances, resetMouseScrollState_fn).bind(this), {
    signal
  });
  window.addEventListener("contextmenu", __privateMethod(this, _PDFPresentationMode_instances, contextMenu_fn).bind(this), {
    signal
  });
  window.addEventListener("touchstart", touchSwipeBind, {
    signal
  });
  window.addEventListener("touchmove", touchSwipeBind, {
    signal
  });
  window.addEventListener("touchend", touchSwipeBind, {
    signal
  });
};
removeWindowListeners_fn = function() {
  var _a2;
  (_a2 = __privateGet(this, _windowAbortController)) == null ? void 0 : _a2.abort();
  __privateSet(this, _windowAbortController, null);
};
addFullscreenChangeListeners_fn = function() {
  if (__privateGet(this, _fullscreenChangeAbortController)) {
    return;
  }
  __privateSet(this, _fullscreenChangeAbortController, new AbortController());
  window.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
      __privateMethod(this, _PDFPresentationMode_instances, enter_fn).call(this);
    } else {
      __privateMethod(this, _PDFPresentationMode_instances, exit_fn).call(this);
    }
  }, {
    signal: __privateGet(this, _fullscreenChangeAbortController).signal
  });
};
removeFullscreenChangeListeners_fn = function() {
  var _a2;
  (_a2 = __privateGet(this, _fullscreenChangeAbortController)) == null ? void 0 : _a2.abort();
  __privateSet(this, _fullscreenChangeAbortController, null);
};
;
class XfaLayerBuilder {
  constructor({
    pdfPage,
    annotationStorage = null,
    linkService,
    xfaHtml = null
  }) {
    this.pdfPage = pdfPage;
    this.annotationStorage = annotationStorage;
    this.linkService = linkService;
    this.xfaHtml = xfaHtml;
    this.div = null;
    this._cancelled = false;
  }
  async render(viewport, intent = "display") {
    if (intent === "print") {
      const parameters2 = {
        viewport: viewport.clone({
          dontFlip: true
        }),
        div: this.div,
        xfaHtml: this.xfaHtml,
        annotationStorage: this.annotationStorage,
        linkService: this.linkService,
        intent
      };
      this.div = document.createElement("div");
      parameters2.div = this.div;
      return XfaLayer.render(parameters2);
    }
    const xfaHtml = await this.pdfPage.getXfa();
    if (this._cancelled || !xfaHtml) {
      return {
        textDivs: []
      };
    }
    const parameters = {
      viewport: viewport.clone({
        dontFlip: true
      }),
      div: this.div,
      xfaHtml,
      annotationStorage: this.annotationStorage,
      linkService: this.linkService,
      intent
    };
    if (this.div) {
      return XfaLayer.update(parameters);
    }
    this.div = document.createElement("div");
    parameters.div = this.div;
    return XfaLayer.render(parameters);
  }
  cancel() {
    this._cancelled = true;
  }
  hide() {
    if (!this.div) {
      return;
    }
    this.div.hidden = true;
  }
}
;
function getXfaHtmlForPrinting(printContainer, pdfDocument) {
  const xfaHtml = pdfDocument.allXfaHtml;
  const linkService = new SimpleLinkService();
  const scale = Math.round(PixelsPerInch.PDF_TO_CSS_UNITS * 100) / 100;
  for (const xfaPage of xfaHtml.children) {
    const page = document.createElement("div");
    page.className = "xfaPrintedPage";
    printContainer.append(page);
    const builder = new XfaLayerBuilder({
      pdfPage: null,
      annotationStorage: pdfDocument.annotationStorage,
      linkService,
      xfaHtml: xfaPage
    });
    const viewport = getXfaPageViewport(xfaPage, {
      scale
    });
    builder.render(viewport, "print");
    page.append(builder.div);
  }
}
;
let activeService = null;
let dialog = null;
let overlayManager = null;
let viewerApp = {
  initialized: false
};
function renderPage(activeServiceOnEntry, pdfDocument, pageNumber, size, printResolution, optionalContentConfigPromise, printAnnotationStoragePromise) {
  const scratchCanvas = activeService.scratchCanvas;
  const PRINT_UNITS = printResolution / PixelsPerInch.PDF;
  scratchCanvas.width = Math.floor(size.width * PRINT_UNITS);
  scratchCanvas.height = Math.floor(size.height * PRINT_UNITS);
  const ctx = scratchCanvas.getContext("2d");
  ctx.save();
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
  ctx.restore();
  return Promise.all([pdfDocument.getPage(pageNumber), printAnnotationStoragePromise]).then(function([pdfPage, printAnnotationStorage]) {
    const renderContext = {
      canvasContext: ctx,
      transform: [PRINT_UNITS, 0, 0, PRINT_UNITS, 0, 0],
      viewport: pdfPage.getViewport({
        scale: 1,
        rotation: size.rotation
      }),
      intent: "print",
      annotationMode: AnnotationMode.ENABLE_STORAGE,
      optionalContentConfigPromise,
      printAnnotationStorage
    };
    const renderTask = pdfPage.render(renderContext);
    return renderTask.promise.catch((reason) => {
      if (!(reason instanceof RenderingCancelledException)) {
        console.error(reason);
      }
      throw reason;
    });
  });
}
class PDFPrintService {
  constructor({
    pdfDocument,
    pagesOverview,
    printContainer,
    printResolution,
    printAnnotationStoragePromise = null
  }) {
    this.pdfDocument = pdfDocument;
    this.pagesOverview = pagesOverview;
    this.printContainer = printContainer;
    this._printResolution = printResolution || 150;
    this._optionalContentConfigPromise = pdfDocument.getOptionalContentConfig({
      intent: "print"
    });
    this._printAnnotationStoragePromise = printAnnotationStoragePromise || Promise.resolve();
    this.currentPage = -1;
    this.scratchCanvas = document.createElement("canvas");
  }
  layout() {
    this.throwIfInactive();
    const body = document.querySelector("body");
    body.setAttribute("data-pdfjsprinting", true);
    const {
      width,
      height
    } = this.pagesOverview[0];
    const hasEqualPageSizes = this.pagesOverview.every((size) => size.width === width && size.height === height);
    if (!hasEqualPageSizes) {
      console.warn("Not all pages have the same size. The printed result may be incorrect!");
    }
    this.pageStyleSheet = document.createElement("style");
    this.pageStyleSheet.textContent = `@page { size: ${width}pt ${height}pt;}`;
    body.append(this.pageStyleSheet);
  }
  destroy() {
    if (activeService !== this) {
      return;
    }
    this.printContainer.textContent = "";
    const body = document.querySelector("body");
    body.removeAttribute("data-pdfjsprinting");
    if (this.pageStyleSheet) {
      this.pageStyleSheet.remove();
      this.pageStyleSheet = null;
    }
    this.scratchCanvas.width = this.scratchCanvas.height = 0;
    this.scratchCanvas = null;
    activeService = null;
    ensureOverlay().then(function() {
      if (overlayManager.active === dialog) {
        overlayManager.close(dialog);
      }
    });
  }
  renderPages() {
    if (this.pdfDocument.isPureXfa) {
      getXfaHtmlForPrinting(this.printContainer, this.pdfDocument);
      return Promise.resolve();
    }
    const pageCount = this.pagesOverview.length;
    const renderNextPage = (resolve, reject) => {
      this.throwIfInactive();
      if (++this.currentPage >= pageCount) {
        renderProgress(pageCount, pageCount);
        resolve();
        return;
      }
      const index = this.currentPage;
      renderProgress(index, pageCount);
      renderPage(this, this.pdfDocument, index + 1, this.pagesOverview[index], this._printResolution, this._optionalContentConfigPromise, this._printAnnotationStoragePromise).then(this.useRenderedPage.bind(this)).then(function() {
        renderNextPage(resolve, reject);
      }, reject);
    };
    return new Promise(renderNextPage);
  }
  useRenderedPage() {
    this.throwIfInactive();
    const img = document.createElement("img");
    this.scratchCanvas.toBlob((blob) => {
      img.src = URL.createObjectURL(blob);
    });
    const wrapper = document.createElement("div");
    wrapper.className = "printedPage";
    wrapper.append(img);
    this.printContainer.append(wrapper);
    const {
      promise,
      resolve,
      reject
    } = Promise.withResolvers();
    img.onload = resolve;
    img.onerror = reject;
    promise.catch(() => {
    }).then(() => {
      URL.revokeObjectURL(img.src);
    });
    return promise;
  }
  performPrint() {
    this.throwIfInactive();
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.active) {
          resolve();
          return;
        }
        print.call(window);
        setTimeout(resolve, 20);
      }, 0);
    });
  }
  get active() {
    return this === activeService;
  }
  throwIfInactive() {
    if (!this.active) {
      throw new Error("This print request was cancelled or completed.");
    }
  }
}
const print = window.print;
window.print = function() {
  if (activeService) {
    console.warn("Ignored window.print() because of a pending print job.");
    return;
  }
  ensureOverlay().then(function() {
    if (activeService) {
      overlayManager.open(dialog);
    }
  });
  try {
    dispatchEvent("beforeprint");
  } finally {
    if (!activeService) {
      console.error("Expected print service to be initialized.");
      ensureOverlay().then(function() {
        if (overlayManager.active === dialog) {
          overlayManager.close(dialog);
        }
      });
      return;
    }
    const activeServiceOnEntry = activeService;
    activeService.renderPages().then(function() {
      return activeServiceOnEntry.performPrint();
    }).catch(function() {
    }).then(function() {
      if (activeServiceOnEntry.active) {
        abort();
      }
    });
  }
};
function dispatchEvent(eventType) {
  const event = new CustomEvent(eventType, {
    bubbles: false,
    cancelable: false,
    detail: "custom"
  });
  window.dispatchEvent(event);
}
function abort() {
  if (activeService) {
    activeService.destroy();
    dispatchEvent("afterprint");
  }
}
function renderProgress(index, total) {
  dialog || (dialog = document.getElementById("printServiceDialog"));
  const progress = Math.round(100 * index / total);
  const progressBar = dialog.querySelector("progress");
  const progressPerc = dialog.querySelector(".relative-progress");
  progressBar.value = progress;
  progressPerc.setAttribute("data-l10n-args", JSON.stringify({
    progress
  }));
}
window.addEventListener("keydown", function(event) {
  if (event.keyCode === 80 && (event.ctrlKey || event.metaKey) && !event.altKey && (!event.shiftKey || window.chrome || window.opera)) {
    window.print();
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}, true);
if ("onbeforeprint" in window) {
  const stopPropagationIfNeeded = function(event) {
    if (event.detail !== "custom") {
      event.stopImmediatePropagation();
    }
  };
  window.addEventListener("beforeprint", stopPropagationIfNeeded);
  window.addEventListener("afterprint", stopPropagationIfNeeded);
}
let overlayPromise;
function ensureOverlay() {
  if (!overlayPromise) {
    overlayManager = viewerApp.overlayManager;
    if (!overlayManager) {
      throw new Error("The overlay manager has not yet been initialized.");
    }
    dialog || (dialog = document.getElementById("printServiceDialog"));
    overlayPromise = overlayManager.register(dialog, true);
    document.getElementById("printCancel").onclick = abort;
    dialog.addEventListener("close", abort);
  }
  return overlayPromise;
}
class PDFPrintServiceFactory {
  static initGlobals(app) {
    viewerApp = app;
  }
  static get supportsPrinting() {
    return shadow(this, "supportsPrinting", true);
  }
  static createPrintService(params) {
    if (activeService) {
      throw new Error("The print service is created and active.");
    }
    return activeService = new PDFPrintService(params);
  }
}
;
const CLEANUP_TIMEOUT = 3e4;
class PDFRenderingQueue {
  constructor() {
    this.pdfViewer = null;
    this.pdfThumbnailViewer = null;
    this.onIdle = null;
    this.highestPriorityPage = null;
    this.idleTimeout = null;
    this.printing = false;
    this.isThumbnailViewEnabled = false;
    Object.defineProperty(this, "hasViewer", {
      value: () => !!this.pdfViewer
    });
  }
  setViewer(pdfViewer) {
    this.pdfViewer = pdfViewer;
  }
  setThumbnailViewer(pdfThumbnailViewer) {
    this.pdfThumbnailViewer = pdfThumbnailViewer;
  }
  isHighestPriority(view) {
    return this.highestPriorityPage === view.renderingId;
  }
  renderHighestPriority(currentlyVisiblePages) {
    var _a2;
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = null;
    }
    if (this.pdfViewer.forceRendering(currentlyVisiblePages)) {
      return;
    }
    if (this.isThumbnailViewEnabled && ((_a2 = this.pdfThumbnailViewer) == null ? void 0 : _a2.forceRendering())) {
      return;
    }
    if (this.printing) {
      return;
    }
    if (this.onIdle) {
      this.idleTimeout = setTimeout(this.onIdle.bind(this), CLEANUP_TIMEOUT);
    }
  }
  getHighestPriority(visible, views, scrolledDown, preRenderExtra = false) {
    const visibleViews = visible.views, numVisible = visibleViews.length;
    if (numVisible === 0) {
      return null;
    }
    for (let i = 0; i < numVisible; i++) {
      const view = visibleViews[i].view;
      if (!this.isViewFinished(view)) {
        return view;
      }
    }
    const firstId = visible.first.id, lastId = visible.last.id;
    if (lastId - firstId + 1 > numVisible) {
      const visibleIds = visible.ids;
      for (let i = 1, ii = lastId - firstId; i < ii; i++) {
        const holeId = scrolledDown ? firstId + i : lastId - i;
        if (visibleIds.has(holeId)) {
          continue;
        }
        const holeView = views[holeId - 1];
        if (!this.isViewFinished(holeView)) {
          return holeView;
        }
      }
    }
    let preRenderIndex = scrolledDown ? lastId : firstId - 2;
    let preRenderView = views[preRenderIndex];
    if (preRenderView && !this.isViewFinished(preRenderView)) {
      return preRenderView;
    }
    if (preRenderExtra) {
      preRenderIndex += scrolledDown ? 1 : -1;
      preRenderView = views[preRenderIndex];
      if (preRenderView && !this.isViewFinished(preRenderView)) {
        return preRenderView;
      }
    }
    return null;
  }
  isViewFinished(view) {
    return view.renderingState === RenderingStates.FINISHED;
  }
  renderView(view) {
    switch (view.renderingState) {
      case RenderingStates.FINISHED:
        return false;
      case RenderingStates.PAUSED:
        this.highestPriorityPage = view.renderingId;
        view.resume();
        break;
      case RenderingStates.RUNNING:
        this.highestPriorityPage = view.renderingId;
        break;
      case RenderingStates.INITIAL:
        this.highestPriorityPage = view.renderingId;
        view.draw().finally(() => {
          this.renderHighestPriority();
        }).catch((reason) => {
          if (reason instanceof RenderingCancelledException) {
            return;
          }
          console.error("renderView:", reason);
        });
        break;
    }
    return true;
  }
}
;
class PDFScriptingManager {
  constructor({
    eventBus,
    externalServices = null,
    docProperties: docProperties2 = null
  }) {
    __privateAdd(this, _PDFScriptingManager_instances);
    __privateAdd(this, _closeCapability, null);
    __privateAdd(this, _destroyCapability, null);
    __privateAdd(this, _docProperties, null);
    __privateAdd(this, _eventAbortController2, null);
    __privateAdd(this, _eventBus5, null);
    __privateAdd(this, _externalServices2, null);
    __privateAdd(this, _pdfDocument, null);
    __privateAdd(this, _pdfViewer, null);
    __privateAdd(this, _ready, false);
    __privateAdd(this, _scripting, null);
    __privateAdd(this, _willPrintCapability, null);
    __privateSet(this, _eventBus5, eventBus);
    __privateSet(this, _externalServices2, externalServices);
    __privateSet(this, _docProperties, docProperties2);
  }
  setViewer(pdfViewer) {
    __privateSet(this, _pdfViewer, pdfViewer);
  }
  async setDocument(pdfDocument) {
    var _a2;
    if (__privateGet(this, _pdfDocument)) {
      await __privateMethod(this, _PDFScriptingManager_instances, destroyScripting_fn).call(this);
    }
    __privateSet(this, _pdfDocument, pdfDocument);
    if (!pdfDocument) {
      return;
    }
    const [objects, calculationOrder, docActions] = await Promise.all([pdfDocument.getFieldObjects(), pdfDocument.getCalculationOrderIds(), pdfDocument.getJSActions()]);
    if (!objects && !docActions) {
      await __privateMethod(this, _PDFScriptingManager_instances, destroyScripting_fn).call(this);
      return;
    }
    if (pdfDocument !== __privateGet(this, _pdfDocument)) {
      return;
    }
    try {
      __privateSet(this, _scripting, __privateMethod(this, _PDFScriptingManager_instances, initScripting_fn).call(this));
    } catch (error) {
      console.error("setDocument:", error);
      await __privateMethod(this, _PDFScriptingManager_instances, destroyScripting_fn).call(this);
      return;
    }
    const eventBus = __privateGet(this, _eventBus5);
    __privateSet(this, _eventAbortController2, new AbortController());
    const {
      signal
    } = __privateGet(this, _eventAbortController2);
    eventBus._on("updatefromsandbox", (event) => {
      if ((event == null ? void 0 : event.source) === window) {
        __privateMethod(this, _PDFScriptingManager_instances, updateFromSandbox_fn).call(this, event.detail);
      }
    }, {
      signal
    });
    eventBus._on("dispatcheventinsandbox", (event) => {
      var _a3;
      (_a3 = __privateGet(this, _scripting)) == null ? void 0 : _a3.dispatchEventInSandbox(event.detail);
    }, {
      signal
    });
    eventBus._on("pagechanging", ({
      pageNumber,
      previous
    }) => {
      if (pageNumber === previous) {
        return;
      }
      __privateMethod(this, _PDFScriptingManager_instances, dispatchPageClose_fn).call(this, previous);
      __privateMethod(this, _PDFScriptingManager_instances, dispatchPageOpen_fn).call(this, pageNumber);
    }, {
      signal
    });
    eventBus._on("pagerendered", ({
      pageNumber
    }) => {
      if (!this._pageOpenPending.has(pageNumber)) {
        return;
      }
      if (pageNumber !== __privateGet(this, _pdfViewer).currentPageNumber) {
        return;
      }
      __privateMethod(this, _PDFScriptingManager_instances, dispatchPageOpen_fn).call(this, pageNumber);
    }, {
      signal
    });
    eventBus._on("pagesdestroy", async () => {
      var _a3, _b;
      await __privateMethod(this, _PDFScriptingManager_instances, dispatchPageClose_fn).call(this, __privateGet(this, _pdfViewer).currentPageNumber);
      await ((_a3 = __privateGet(this, _scripting)) == null ? void 0 : _a3.dispatchEventInSandbox({
        id: "doc",
        name: "WillClose"
      }));
      (_b = __privateGet(this, _closeCapability)) == null ? void 0 : _b.resolve();
    }, {
      signal
    });
    try {
      const docProperties2 = await __privateGet(this, _docProperties).call(this, pdfDocument);
      if (pdfDocument !== __privateGet(this, _pdfDocument)) {
        return;
      }
      await __privateGet(this, _scripting).createSandbox({
        objects,
        calculationOrder,
        appInfo: {
          platform: navigator.platform,
          language: navigator.language
        },
        docInfo: {
          ...docProperties2,
          actions: docActions
        }
      });
      eventBus.dispatch("sandboxcreated", {
        source: this
      });
    } catch (error) {
      console.error("setDocument:", error);
      await __privateMethod(this, _PDFScriptingManager_instances, destroyScripting_fn).call(this);
      return;
    }
    await ((_a2 = __privateGet(this, _scripting)) == null ? void 0 : _a2.dispatchEventInSandbox({
      id: "doc",
      name: "Open"
    }));
    await __privateMethod(this, _PDFScriptingManager_instances, dispatchPageOpen_fn).call(this, __privateGet(this, _pdfViewer).currentPageNumber, true);
    Promise.resolve().then(() => {
      if (pdfDocument === __privateGet(this, _pdfDocument)) {
        __privateSet(this, _ready, true);
      }
    });
  }
  async dispatchWillSave() {
    var _a2;
    return (_a2 = __privateGet(this, _scripting)) == null ? void 0 : _a2.dispatchEventInSandbox({
      id: "doc",
      name: "WillSave"
    });
  }
  async dispatchDidSave() {
    var _a2;
    return (_a2 = __privateGet(this, _scripting)) == null ? void 0 : _a2.dispatchEventInSandbox({
      id: "doc",
      name: "DidSave"
    });
  }
  async dispatchWillPrint() {
    var _a2;
    if (!__privateGet(this, _scripting)) {
      return;
    }
    await ((_a2 = __privateGet(this, _willPrintCapability)) == null ? void 0 : _a2.promise);
    __privateSet(this, _willPrintCapability, Promise.withResolvers());
    try {
      await __privateGet(this, _scripting).dispatchEventInSandbox({
        id: "doc",
        name: "WillPrint"
      });
    } catch (ex) {
      __privateGet(this, _willPrintCapability).resolve();
      __privateSet(this, _willPrintCapability, null);
      throw ex;
    }
    await __privateGet(this, _willPrintCapability).promise;
  }
  async dispatchDidPrint() {
    var _a2;
    return (_a2 = __privateGet(this, _scripting)) == null ? void 0 : _a2.dispatchEventInSandbox({
      id: "doc",
      name: "DidPrint"
    });
  }
  get destroyPromise() {
    var _a2;
    return ((_a2 = __privateGet(this, _destroyCapability)) == null ? void 0 : _a2.promise) || null;
  }
  get ready() {
    return __privateGet(this, _ready);
  }
  get _pageOpenPending() {
    return shadow(this, "_pageOpenPending", /* @__PURE__ */ new Set());
  }
  get _visitedPages() {
    return shadow(this, "_visitedPages", /* @__PURE__ */ new Map());
  }
}
_closeCapability = new WeakMap();
_destroyCapability = new WeakMap();
_docProperties = new WeakMap();
_eventAbortController2 = new WeakMap();
_eventBus5 = new WeakMap();
_externalServices2 = new WeakMap();
_pdfDocument = new WeakMap();
_pdfViewer = new WeakMap();
_ready = new WeakMap();
_scripting = new WeakMap();
_willPrintCapability = new WeakMap();
_PDFScriptingManager_instances = new WeakSet();
updateFromSandbox_fn = async function(detail) {
  var _a2, _b;
  const pdfViewer = __privateGet(this, _pdfViewer);
  const isInPresentationMode = pdfViewer.isInPresentationMode || pdfViewer.isChangingPresentationMode;
  const {
    id,
    siblings,
    command,
    value
  } = detail;
  if (!id) {
    switch (command) {
      case "clear":
        console.clear();
        break;
      case "error":
        console.error(value);
        break;
      case "layout":
        if (!isInPresentationMode) {
          const modes = apiPageLayoutToViewerModes(value);
          pdfViewer.spreadMode = modes.spreadMode;
        }
        break;
      case "page-num":
        pdfViewer.currentPageNumber = value + 1;
        break;
      case "print":
        await pdfViewer.pagesPromise;
        __privateGet(this, _eventBus5).dispatch("print", {
          source: this
        });
        break;
      case "println":
        console.log(value);
        break;
      case "zoom":
        if (!isInPresentationMode) {
          pdfViewer.currentScaleValue = value;
        }
        break;
      case "SaveAs":
        __privateGet(this, _eventBus5).dispatch("download", {
          source: this
        });
        break;
      case "FirstPage":
        pdfViewer.currentPageNumber = 1;
        break;
      case "LastPage":
        pdfViewer.currentPageNumber = pdfViewer.pagesCount;
        break;
      case "NextPage":
        pdfViewer.nextPage();
        break;
      case "PrevPage":
        pdfViewer.previousPage();
        break;
      case "ZoomViewIn":
        if (!isInPresentationMode) {
          pdfViewer.increaseScale();
        }
        break;
      case "ZoomViewOut":
        if (!isInPresentationMode) {
          pdfViewer.decreaseScale();
        }
        break;
      case "WillPrintFinished":
        (_a2 = __privateGet(this, _willPrintCapability)) == null ? void 0 : _a2.resolve();
        __privateSet(this, _willPrintCapability, null);
        break;
    }
    return;
  }
  if (isInPresentationMode && detail.focus) {
    return;
  }
  delete detail.id;
  delete detail.siblings;
  const ids = siblings ? [id, ...siblings] : [id];
  for (const elementId of ids) {
    const element = document.querySelector(`[data-element-id="${elementId}"]`);
    if (element) {
      element.dispatchEvent(new CustomEvent("updatefromsandbox", {
        detail
      }));
    } else {
      (_b = __privateGet(this, _pdfDocument)) == null ? void 0 : _b.annotationStorage.setValue(elementId, detail);
    }
  }
};
dispatchPageOpen_fn = async function(pageNumber, initialize = false) {
  const pdfDocument = __privateGet(this, _pdfDocument), visitedPages = this._visitedPages;
  if (initialize) {
    __privateSet(this, _closeCapability, Promise.withResolvers());
  }
  if (!__privateGet(this, _closeCapability)) {
    return;
  }
  const pageView = __privateGet(this, _pdfViewer).getPageView(pageNumber - 1);
  if ((pageView == null ? void 0 : pageView.renderingState) !== RenderingStates.FINISHED) {
    this._pageOpenPending.add(pageNumber);
    return;
  }
  this._pageOpenPending.delete(pageNumber);
  const actionsPromise = (async () => {
    var _a2, _b;
    const actions = await (!visitedPages.has(pageNumber) ? (_a2 = pageView.pdfPage) == null ? void 0 : _a2.getJSActions() : null);
    if (pdfDocument !== __privateGet(this, _pdfDocument)) {
      return;
    }
    await ((_b = __privateGet(this, _scripting)) == null ? void 0 : _b.dispatchEventInSandbox({
      id: "page",
      name: "PageOpen",
      pageNumber,
      actions
    }));
  })();
  visitedPages.set(pageNumber, actionsPromise);
};
dispatchPageClose_fn = async function(pageNumber) {
  var _a2;
  const pdfDocument = __privateGet(this, _pdfDocument), visitedPages = this._visitedPages;
  if (!__privateGet(this, _closeCapability)) {
    return;
  }
  if (this._pageOpenPending.has(pageNumber)) {
    return;
  }
  const actionsPromise = visitedPages.get(pageNumber);
  if (!actionsPromise) {
    return;
  }
  visitedPages.set(pageNumber, null);
  await actionsPromise;
  if (pdfDocument !== __privateGet(this, _pdfDocument)) {
    return;
  }
  await ((_a2 = __privateGet(this, _scripting)) == null ? void 0 : _a2.dispatchEventInSandbox({
    id: "page",
    name: "PageClose",
    pageNumber
  }));
};
initScripting_fn = function() {
  __privateSet(this, _destroyCapability, Promise.withResolvers());
  if (__privateGet(this, _scripting)) {
    throw new Error("#initScripting: Scripting already exists.");
  }
  return __privateGet(this, _externalServices2).createScripting();
};
destroyScripting_fn = async function() {
  var _a2, _b, _c, _d;
  if (!__privateGet(this, _scripting)) {
    __privateSet(this, _pdfDocument, null);
    (_a2 = __privateGet(this, _destroyCapability)) == null ? void 0 : _a2.resolve();
    return;
  }
  if (__privateGet(this, _closeCapability)) {
    await Promise.race([__privateGet(this, _closeCapability).promise, new Promise((resolve) => {
      setTimeout(resolve, 1e3);
    })]).catch(() => {
    });
    __privateSet(this, _closeCapability, null);
  }
  __privateSet(this, _pdfDocument, null);
  try {
    await __privateGet(this, _scripting).destroySandbox();
  } catch {
  }
  (_b = __privateGet(this, _willPrintCapability)) == null ? void 0 : _b.reject(new Error("Scripting destroyed."));
  __privateSet(this, _willPrintCapability, null);
  (_c = __privateGet(this, _eventAbortController2)) == null ? void 0 : _c.abort();
  __privateSet(this, _eventAbortController2, null);
  this._pageOpenPending.clear();
  this._visitedPages.clear();
  __privateSet(this, _scripting, null);
  __privateSet(this, _ready, false);
  (_d = __privateGet(this, _destroyCapability)) == null ? void 0 : _d.resolve();
};
;
const SIDEBAR_WIDTH_VAR = "--sidebar-width";
const SIDEBAR_MIN_WIDTH = 200;
const SIDEBAR_RESIZING_CLASS = "sidebarResizing";
const UI_NOTIFICATION_CLASS = "pdfSidebarNotification";
class PDFSidebar {
  constructor({
    elements,
    eventBus,
    l10n
  }) {
    __privateAdd(this, _PDFSidebar_instances);
    __privateAdd(this, _isRTL, false);
    __privateAdd(this, _mouseAC, null);
    __privateAdd(this, _outerContainerWidth, null);
    __privateAdd(this, _width, null);
    this.isOpen = false;
    this.active = SidebarView.THUMBS;
    this.isInitialViewSet = false;
    this.isInitialEventDispatched = false;
    this.onToggled = null;
    this.onUpdateThumbnails = null;
    this.outerContainer = elements.outerContainer;
    this.sidebarContainer = elements.sidebarContainer;
    this.toggleButton = elements.toggleButton;
    this.resizer = elements.resizer;
    this.thumbnailButton = elements.thumbnailButton;
    this.outlineButton = elements.outlineButton;
    this.attachmentsButton = elements.attachmentsButton;
    this.layersButton = elements.layersButton;
    this.thumbnailView = elements.thumbnailView;
    this.outlineView = elements.outlineView;
    this.attachmentsView = elements.attachmentsView;
    this.layersView = elements.layersView;
    this._currentOutlineItemButton = elements.currentOutlineItemButton;
    this.eventBus = eventBus;
    __privateSet(this, _isRTL, l10n.getDirection() === "rtl");
    __privateMethod(this, _PDFSidebar_instances, addEventListeners_fn2).call(this);
  }
  reset() {
    this.isInitialViewSet = false;
    this.isInitialEventDispatched = false;
    __privateMethod(this, _PDFSidebar_instances, hideUINotification_fn).call(this, true);
    this.switchView(SidebarView.THUMBS);
    this.outlineButton.disabled = false;
    this.attachmentsButton.disabled = false;
    this.layersButton.disabled = false;
    this._currentOutlineItemButton.disabled = true;
  }
  get visibleView() {
    return this.isOpen ? this.active : SidebarView.NONE;
  }
  setInitialView(view = SidebarView.NONE) {
    if (this.isInitialViewSet) {
      return;
    }
    this.isInitialViewSet = true;
    if (view === SidebarView.NONE || view === SidebarView.UNKNOWN) {
      __privateMethod(this, _PDFSidebar_instances, dispatchEvent_fn).call(this);
      return;
    }
    this.switchView(view, true);
    if (!this.isInitialEventDispatched) {
      __privateMethod(this, _PDFSidebar_instances, dispatchEvent_fn).call(this);
    }
  }
  switchView(view, forceOpen = false) {
    const isViewChanged = view !== this.active;
    let forceRendering = false;
    switch (view) {
      case SidebarView.NONE:
        if (this.isOpen) {
          this.close();
        }
        return;
      case SidebarView.THUMBS:
        if (this.isOpen && isViewChanged) {
          forceRendering = true;
        }
        break;
      case SidebarView.OUTLINE:
        if (this.outlineButton.disabled) {
          return;
        }
        break;
      case SidebarView.ATTACHMENTS:
        if (this.attachmentsButton.disabled) {
          return;
        }
        break;
      case SidebarView.LAYERS:
        if (this.layersButton.disabled) {
          return;
        }
        break;
      default:
        console.error(`PDFSidebar.switchView: "${view}" is not a valid view.`);
        return;
    }
    this.active = view;
    toggleCheckedBtn(this.thumbnailButton, view === SidebarView.THUMBS, this.thumbnailView);
    toggleCheckedBtn(this.outlineButton, view === SidebarView.OUTLINE, this.outlineView);
    toggleCheckedBtn(this.attachmentsButton, view === SidebarView.ATTACHMENTS, this.attachmentsView);
    toggleCheckedBtn(this.layersButton, view === SidebarView.LAYERS, this.layersView);
    if (forceOpen && !this.isOpen) {
      this.open();
      return;
    }
    if (forceRendering) {
      this.onUpdateThumbnails();
      this.onToggled();
    }
    if (isViewChanged) {
      __privateMethod(this, _PDFSidebar_instances, dispatchEvent_fn).call(this);
    }
  }
  open() {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    toggleExpandedBtn(this.toggleButton, true);
    this.outerContainer.classList.add("sidebarMoving", "sidebarOpen");
    if (this.active === SidebarView.THUMBS) {
      this.onUpdateThumbnails();
    }
    this.onToggled();
    __privateMethod(this, _PDFSidebar_instances, dispatchEvent_fn).call(this);
    __privateMethod(this, _PDFSidebar_instances, hideUINotification_fn).call(this);
  }
  close(evt = null) {
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
    toggleExpandedBtn(this.toggleButton, false);
    this.outerContainer.classList.add("sidebarMoving");
    this.outerContainer.classList.remove("sidebarOpen");
    this.onToggled();
    __privateMethod(this, _PDFSidebar_instances, dispatchEvent_fn).call(this);
    if ((evt == null ? void 0 : evt.detail) > 0) {
      this.toggleButton.blur();
    }
  }
  toggle(evt = null) {
    if (this.isOpen) {
      this.close(evt);
    } else {
      this.open();
    }
  }
  get outerContainerWidth() {
    return __privateGet(this, _outerContainerWidth) || __privateSet(this, _outerContainerWidth, this.outerContainer.clientWidth);
  }
}
_isRTL = new WeakMap();
_mouseAC = new WeakMap();
_outerContainerWidth = new WeakMap();
_width = new WeakMap();
_PDFSidebar_instances = new WeakSet();
dispatchEvent_fn = function() {
  if (this.isInitialViewSet) {
    this.isInitialEventDispatched || (this.isInitialEventDispatched = true);
  }
  this.eventBus.dispatch("sidebarviewchanged", {
    source: this,
    view: this.visibleView
  });
};
showUINotification_fn = function() {
  this.toggleButton.setAttribute("data-l10n-id", "pdfjs-toggle-sidebar-notification-button");
  if (!this.isOpen) {
    this.toggleButton.classList.add(UI_NOTIFICATION_CLASS);
  }
};
hideUINotification_fn = function(reset = false) {
  if (this.isOpen || reset) {
    this.toggleButton.classList.remove(UI_NOTIFICATION_CLASS);
  }
  if (reset) {
    this.toggleButton.setAttribute("data-l10n-id", "pdfjs-toggle-sidebar-button");
  }
};
addEventListeners_fn2 = function() {
  const {
    eventBus,
    outerContainer
  } = this;
  this.sidebarContainer.addEventListener("transitionend", (evt) => {
    if (evt.target === this.sidebarContainer) {
      outerContainer.classList.remove("sidebarMoving");
      eventBus.dispatch("resize", {
        source: this
      });
    }
  });
  this.toggleButton.addEventListener("click", (evt) => {
    this.toggle(evt);
  });
  this.thumbnailButton.addEventListener("click", () => {
    this.switchView(SidebarView.THUMBS);
  });
  this.outlineButton.addEventListener("click", () => {
    this.switchView(SidebarView.OUTLINE);
  });
  this.outlineButton.addEventListener("dblclick", () => {
    eventBus.dispatch("toggleoutlinetree", {
      source: this
    });
  });
  this.attachmentsButton.addEventListener("click", () => {
    this.switchView(SidebarView.ATTACHMENTS);
  });
  this.layersButton.addEventListener("click", () => {
    this.switchView(SidebarView.LAYERS);
  });
  this.layersButton.addEventListener("dblclick", () => {
    eventBus.dispatch("resetlayers", {
      source: this
    });
  });
  this._currentOutlineItemButton.addEventListener("click", () => {
    eventBus.dispatch("currentoutlineitem", {
      source: this
    });
  });
  const onTreeLoaded = (count, button, view) => {
    button.disabled = !count;
    if (count) {
      __privateMethod(this, _PDFSidebar_instances, showUINotification_fn).call(this);
    } else if (this.active === view) {
      this.switchView(SidebarView.THUMBS);
    }
  };
  eventBus._on("outlineloaded", (evt) => {
    onTreeLoaded(evt.outlineCount, this.outlineButton, SidebarView.OUTLINE);
    evt.currentOutlineItemPromise.then((enabled) => {
      if (!this.isInitialViewSet) {
        return;
      }
      this._currentOutlineItemButton.disabled = !enabled;
    });
  });
  eventBus._on("attachmentsloaded", (evt) => {
    onTreeLoaded(evt.attachmentsCount, this.attachmentsButton, SidebarView.ATTACHMENTS);
  });
  eventBus._on("layersloaded", (evt) => {
    onTreeLoaded(evt.layersCount, this.layersButton, SidebarView.LAYERS);
  });
  eventBus._on("presentationmodechanged", (evt) => {
    if (evt.state === PresentationModeState.NORMAL && this.visibleView === SidebarView.THUMBS) {
      this.onUpdateThumbnails();
    }
  });
  this.resizer.addEventListener("mousedown", (evt) => {
    if (evt.button !== 0) {
      return;
    }
    outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);
    __privateSet(this, _mouseAC, new AbortController());
    const opts = {
      signal: __privateGet(this, _mouseAC).signal
    };
    window.addEventListener("mousemove", __privateMethod(this, _PDFSidebar_instances, mouseMove_fn).bind(this), opts);
    window.addEventListener("mouseup", __privateMethod(this, _PDFSidebar_instances, mouseUp_fn).bind(this), opts);
    window.addEventListener("blur", __privateMethod(this, _PDFSidebar_instances, mouseUp_fn).bind(this), opts);
  });
  eventBus._on("resize", (evt) => {
    if (evt.source !== window) {
      return;
    }
    __privateSet(this, _outerContainerWidth, null);
    if (!__privateGet(this, _width)) {
      return;
    }
    if (!this.isOpen) {
      __privateMethod(this, _PDFSidebar_instances, updateWidth_fn).call(this, __privateGet(this, _width));
      return;
    }
    outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);
    const updated = __privateMethod(this, _PDFSidebar_instances, updateWidth_fn).call(this, __privateGet(this, _width));
    Promise.resolve().then(() => {
      outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);
      if (updated) {
        eventBus.dispatch("resize", {
          source: this
        });
      }
    });
  });
};
updateWidth_fn = function(width = 0) {
  const maxWidth = Math.floor(this.outerContainerWidth / 2);
  if (width > maxWidth) {
    width = maxWidth;
  }
  if (width < SIDEBAR_MIN_WIDTH) {
    width = SIDEBAR_MIN_WIDTH;
  }
  if (width === __privateGet(this, _width)) {
    return false;
  }
  __privateSet(this, _width, width);
  docStyle.setProperty(SIDEBAR_WIDTH_VAR, `${width}px`);
  return true;
};
mouseMove_fn = function(evt) {
  let width = evt.clientX;
  if (__privateGet(this, _isRTL)) {
    width = this.outerContainerWidth - width;
  }
  __privateMethod(this, _PDFSidebar_instances, updateWidth_fn).call(this, width);
};
mouseUp_fn = function(evt) {
  var _a2;
  this.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);
  this.eventBus.dispatch("resize", {
    source: this
  });
  (_a2 = __privateGet(this, _mouseAC)) == null ? void 0 : _a2.abort();
  __privateSet(this, _mouseAC, null);
};
;
const DRAW_UPSCALE_FACTOR = 2;
const MAX_NUM_SCALING_STEPS = 3;
const THUMBNAIL_WIDTH = 98;
class TempImageFactory {
  static #tempCanvas = null;
  static getCanvas(width, height) {
    const tempCanvas = this.#tempCanvas || (this.#tempCanvas = document.createElement("canvas"));
    tempCanvas.width = width;
    tempCanvas.height = height;
    const ctx = tempCanvas.getContext("2d", {
      alpha: false
    });
    ctx.save();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
    return [tempCanvas, tempCanvas.getContext("2d")];
  }
  static destroyCanvas() {
    const tempCanvas = this.#tempCanvas;
    if (tempCanvas) {
      tempCanvas.width = 0;
      tempCanvas.height = 0;
    }
    this.#tempCanvas = null;
  }
}
class PDFThumbnailView {
  constructor({
    container,
    eventBus,
    id,
    defaultViewport,
    optionalContentConfigPromise,
    linkService,
    renderingQueue,
    pageColors,
    enableHWA
  }) {
    __privateAdd(this, _PDFThumbnailView_instances);
    this.id = id;
    this.renderingId = "thumbnail" + id;
    this.pageLabel = null;
    this.pdfPage = null;
    this.rotation = 0;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = optionalContentConfigPromise || null;
    this.pageColors = pageColors || null;
    this.enableHWA = enableHWA || false;
    this.eventBus = eventBus;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.renderTask = null;
    this.renderingState = RenderingStates.INITIAL;
    this.resume = null;
    const anchor = document.createElement("a");
    anchor.href = linkService.getAnchorUrl("#page=" + id);
    anchor.setAttribute("data-l10n-id", "pdfjs-thumb-page-title");
    anchor.setAttribute("data-l10n-args", __privateGet(this, _PDFThumbnailView_instances, pageL10nArgs_get));
    anchor.onclick = function() {
      linkService.goToPage(id);
      return false;
    };
    this.anchor = anchor;
    const div = document.createElement("div");
    div.className = "thumbnail";
    div.setAttribute("data-page-number", this.id);
    this.div = div;
    __privateMethod(this, _PDFThumbnailView_instances, updateDims_fn).call(this);
    const img = document.createElement("div");
    img.className = "thumbnailImage";
    this._placeholderImg = img;
    div.append(img);
    anchor.append(div);
    container.append(anchor);
  }
  setPdfPage(pdfPage) {
    this.pdfPage = pdfPage;
    this.pdfPageRotate = pdfPage.rotate;
    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = pdfPage.getViewport({
      scale: 1,
      rotation: totalRotation
    });
    this.reset();
  }
  reset() {
    var _a2;
    this.cancelRendering();
    this.renderingState = RenderingStates.INITIAL;
    this.div.removeAttribute("data-loaded");
    (_a2 = this.image) == null ? void 0 : _a2.replaceWith(this._placeholderImg);
    __privateMethod(this, _PDFThumbnailView_instances, updateDims_fn).call(this);
    if (this.image) {
      this.image.removeAttribute("src");
      delete this.image;
    }
  }
  update({
    rotation = null
  }) {
    if (typeof rotation === "number") {
      this.rotation = rotation;
    }
    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = this.viewport.clone({
      scale: 1,
      rotation: totalRotation
    });
    this.reset();
  }
  cancelRendering() {
    if (this.renderTask) {
      this.renderTask.cancel();
      this.renderTask = null;
    }
    this.resume = null;
  }
  async draw() {
    if (this.renderingState !== RenderingStates.INITIAL) {
      console.error("Must be in new state before drawing");
      return void 0;
    }
    const {
      pdfPage
    } = this;
    if (!pdfPage) {
      this.renderingState = RenderingStates.FINISHED;
      throw new Error("pdfPage is not loaded");
    }
    this.renderingState = RenderingStates.RUNNING;
    const {
      ctx,
      canvas,
      transform
    } = __privateMethod(this, _PDFThumbnailView_instances, getPageDrawContext_fn).call(this, DRAW_UPSCALE_FACTOR);
    const drawViewport = this.viewport.clone({
      scale: DRAW_UPSCALE_FACTOR * this.scale
    });
    const renderContinueCallback = (cont) => {
      if (!this.renderingQueue.isHighestPriority(this)) {
        this.renderingState = RenderingStates.PAUSED;
        this.resume = () => {
          this.renderingState = RenderingStates.RUNNING;
          cont();
        };
        return;
      }
      cont();
    };
    const renderContext = {
      canvasContext: ctx,
      transform,
      viewport: drawViewport,
      optionalContentConfigPromise: this._optionalContentConfigPromise,
      pageColors: this.pageColors
    };
    const renderTask = this.renderTask = pdfPage.render(renderContext);
    renderTask.onContinue = renderContinueCallback;
    const resultPromise = renderTask.promise.then(() => __privateMethod(this, _PDFThumbnailView_instances, finishRenderTask_fn).call(this, renderTask, canvas), (error) => __privateMethod(this, _PDFThumbnailView_instances, finishRenderTask_fn).call(this, renderTask, canvas, error));
    resultPromise.finally(() => {
      canvas.width = 0;
      canvas.height = 0;
      this.eventBus.dispatch("thumbnailrendered", {
        source: this,
        pageNumber: this.id,
        pdfPage: this.pdfPage
      });
    });
    return resultPromise;
  }
  setImage(pageView) {
    if (this.renderingState !== RenderingStates.INITIAL) {
      return;
    }
    const {
      thumbnailCanvas: canvas,
      pdfPage,
      scale
    } = pageView;
    if (!canvas) {
      return;
    }
    if (!this.pdfPage) {
      this.setPdfPage(pdfPage);
    }
    if (scale < this.scale) {
      return;
    }
    this.renderingState = RenderingStates.FINISHED;
    __privateMethod(this, _PDFThumbnailView_instances, convertCanvasToImage_fn).call(this, canvas);
  }
  setPageLabel(label) {
    var _a2;
    this.pageLabel = typeof label === "string" ? label : null;
    this.anchor.setAttribute("data-l10n-args", __privateGet(this, _PDFThumbnailView_instances, pageL10nArgs_get));
    if (this.renderingState !== RenderingStates.FINISHED) {
      return;
    }
    (_a2 = this.image) == null ? void 0 : _a2.setAttribute("data-l10n-args", __privateGet(this, _PDFThumbnailView_instances, pageL10nArgs_get));
  }
}
_PDFThumbnailView_instances = new WeakSet();
updateDims_fn = function() {
  const {
    width,
    height
  } = this.viewport;
  const ratio = width / height;
  this.canvasWidth = THUMBNAIL_WIDTH;
  this.canvasHeight = this.canvasWidth / ratio | 0;
  this.scale = this.canvasWidth / width;
  const {
    style
  } = this.div;
  style.setProperty("--thumbnail-width", `${this.canvasWidth}px`);
  style.setProperty("--thumbnail-height", `${this.canvasHeight}px`);
};
getPageDrawContext_fn = function(upscaleFactor = 1, enableHWA = this.enableHWA) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", {
    alpha: false,
    willReadFrequently: !enableHWA
  });
  const outputScale = new OutputScale();
  canvas.width = upscaleFactor * this.canvasWidth * outputScale.sx | 0;
  canvas.height = upscaleFactor * this.canvasHeight * outputScale.sy | 0;
  const transform = outputScale.scaled ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0] : null;
  return {
    ctx,
    canvas,
    transform
  };
};
convertCanvasToImage_fn = function(canvas) {
  if (this.renderingState !== RenderingStates.FINISHED) {
    throw new Error("#convertCanvasToImage: Rendering has not finished.");
  }
  const reducedCanvas = __privateMethod(this, _PDFThumbnailView_instances, reduceImage_fn).call(this, canvas);
  const image = document.createElement("img");
  image.className = "thumbnailImage";
  image.setAttribute("data-l10n-id", "pdfjs-thumb-page-canvas");
  image.setAttribute("data-l10n-args", __privateGet(this, _PDFThumbnailView_instances, pageL10nArgs_get));
  image.src = reducedCanvas.toDataURL();
  this.image = image;
  this.div.setAttribute("data-loaded", true);
  this._placeholderImg.replaceWith(image);
  reducedCanvas.width = 0;
  reducedCanvas.height = 0;
};
finishRenderTask_fn = async function(renderTask, canvas, error = null) {
  if (renderTask === this.renderTask) {
    this.renderTask = null;
  }
  if (error instanceof RenderingCancelledException) {
    return;
  }
  this.renderingState = RenderingStates.FINISHED;
  __privateMethod(this, _PDFThumbnailView_instances, convertCanvasToImage_fn).call(this, canvas);
  if (error) {
    throw error;
  }
};
reduceImage_fn = function(img) {
  const {
    ctx,
    canvas
  } = __privateMethod(this, _PDFThumbnailView_instances, getPageDrawContext_fn).call(this, 1, true);
  if (img.width <= 2 * canvas.width) {
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    return canvas;
  }
  let reducedWidth = canvas.width << MAX_NUM_SCALING_STEPS;
  let reducedHeight = canvas.height << MAX_NUM_SCALING_STEPS;
  const [reducedImage, reducedImageCtx] = TempImageFactory.getCanvas(reducedWidth, reducedHeight);
  while (reducedWidth > img.width || reducedHeight > img.height) {
    reducedWidth >>= 1;
    reducedHeight >>= 1;
  }
  reducedImageCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, reducedWidth, reducedHeight);
  while (reducedWidth > 2 * canvas.width) {
    reducedImageCtx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, reducedWidth >> 1, reducedHeight >> 1);
    reducedWidth >>= 1;
    reducedHeight >>= 1;
  }
  ctx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, canvas.width, canvas.height);
  return canvas;
};
pageL10nArgs_get = function() {
  var _a2;
  return JSON.stringify({
    page: (_a2 = this.pageLabel) != null ? _a2 : this.id
  });
};
;
const THUMBNAIL_SCROLL_MARGIN = -19;
const THUMBNAIL_SELECTED_CLASS = "selected";
class PDFThumbnailViewer {
  constructor({
    container,
    eventBus,
    linkService,
    renderingQueue,
    pageColors,
    abortSignal,
    enableHWA
  }) {
    __privateAdd(this, _PDFThumbnailViewer_instances);
    this.container = container;
    this.eventBus = eventBus;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.pageColors = pageColors || null;
    this.enableHWA = enableHWA || false;
    this.scroll = watchScroll(this.container, __privateMethod(this, _PDFThumbnailViewer_instances, scrollUpdated_fn).bind(this), abortSignal);
    __privateMethod(this, _PDFThumbnailViewer_instances, resetView_fn).call(this);
  }
  getThumbnail(index) {
    return this._thumbnails[index];
  }
  scrollThumbnailIntoView(pageNumber) {
    if (!this.pdfDocument) {
      return;
    }
    const thumbnailView = this._thumbnails[pageNumber - 1];
    if (!thumbnailView) {
      console.error('scrollThumbnailIntoView: Invalid "pageNumber" parameter.');
      return;
    }
    if (pageNumber !== this._currentPageNumber) {
      const prevThumbnailView = this._thumbnails[this._currentPageNumber - 1];
      prevThumbnailView.div.classList.remove(THUMBNAIL_SELECTED_CLASS);
      thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
    }
    const {
      first,
      last,
      views
    } = __privateMethod(this, _PDFThumbnailViewer_instances, getVisibleThumbs_fn).call(this);
    if (views.length > 0) {
      let shouldScroll = false;
      if (pageNumber <= first.id || pageNumber >= last.id) {
        shouldScroll = true;
      } else {
        for (const {
          id,
          percent
        } of views) {
          if (id !== pageNumber) {
            continue;
          }
          shouldScroll = percent < 100;
          break;
        }
      }
      if (shouldScroll) {
        scrollIntoView(thumbnailView.div, {
          top: THUMBNAIL_SCROLL_MARGIN
        });
      }
    }
    this._currentPageNumber = pageNumber;
  }
  get pagesRotation() {
    return this._pagesRotation;
  }
  set pagesRotation(rotation) {
    if (!isValidRotation(rotation)) {
      throw new Error("Invalid thumbnails rotation angle.");
    }
    if (!this.pdfDocument) {
      return;
    }
    if (this._pagesRotation === rotation) {
      return;
    }
    this._pagesRotation = rotation;
    const updateArgs = {
      rotation
    };
    for (const thumbnail of this._thumbnails) {
      thumbnail.update(updateArgs);
    }
  }
  cleanup() {
    for (const thumbnail of this._thumbnails) {
      if (thumbnail.renderingState !== RenderingStates.FINISHED) {
        thumbnail.reset();
      }
    }
    TempImageFactory.destroyCanvas();
  }
  setDocument(pdfDocument) {
    if (this.pdfDocument) {
      __privateMethod(this, _PDFThumbnailViewer_instances, cancelRendering_fn).call(this);
      __privateMethod(this, _PDFThumbnailViewer_instances, resetView_fn).call(this);
    }
    this.pdfDocument = pdfDocument;
    if (!pdfDocument) {
      return;
    }
    const firstPagePromise = pdfDocument.getPage(1);
    const optionalContentConfigPromise = pdfDocument.getOptionalContentConfig({
      intent: "display"
    });
    firstPagePromise.then((firstPdfPage) => {
      var _a2;
      const pagesCount = pdfDocument.numPages;
      const viewport = firstPdfPage.getViewport({
        scale: 1
      });
      for (let pageNum = 1; pageNum <= pagesCount; ++pageNum) {
        const thumbnail = new PDFThumbnailView({
          container: this.container,
          eventBus: this.eventBus,
          id: pageNum,
          defaultViewport: viewport.clone(),
          optionalContentConfigPromise,
          linkService: this.linkService,
          renderingQueue: this.renderingQueue,
          pageColors: this.pageColors,
          enableHWA: this.enableHWA
        });
        this._thumbnails.push(thumbnail);
      }
      (_a2 = this._thumbnails[0]) == null ? void 0 : _a2.setPdfPage(firstPdfPage);
      const thumbnailView = this._thumbnails[this._currentPageNumber - 1];
      thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
    }).catch((reason) => {
      console.error("Unable to initialize thumbnail viewer", reason);
    });
  }
  setPageLabels(labels) {
    var _a2, _b;
    if (!this.pdfDocument) {
      return;
    }
    if (!labels) {
      this._pageLabels = null;
    } else if (!(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)) {
      this._pageLabels = null;
      console.error("PDFThumbnailViewer_setPageLabels: Invalid page labels.");
    } else {
      this._pageLabels = labels;
    }
    for (let i = 0, ii = this._thumbnails.length; i < ii; i++) {
      this._thumbnails[i].setPageLabel((_b = (_a2 = this._pageLabels) == null ? void 0 : _a2[i]) != null ? _b : null);
    }
  }
  forceRendering() {
    const visibleThumbs = __privateMethod(this, _PDFThumbnailViewer_instances, getVisibleThumbs_fn).call(this);
    const scrollAhead = __privateMethod(this, _PDFThumbnailViewer_instances, getScrollAhead_fn).call(this, visibleThumbs);
    const thumbView = this.renderingQueue.getHighestPriority(visibleThumbs, this._thumbnails, scrollAhead);
    if (thumbView) {
      __privateMethod(this, _PDFThumbnailViewer_instances, ensurePdfPageLoaded_fn).call(this, thumbView).then(() => {
        this.renderingQueue.renderView(thumbView);
      });
      return true;
    }
    return false;
  }
}
_PDFThumbnailViewer_instances = new WeakSet();
scrollUpdated_fn = function() {
  this.renderingQueue.renderHighestPriority();
};
getVisibleThumbs_fn = function() {
  return getVisibleElements({
    scrollEl: this.container,
    views: this._thumbnails
  });
};
resetView_fn = function() {
  this._thumbnails = [];
  this._currentPageNumber = 1;
  this._pageLabels = null;
  this._pagesRotation = 0;
  this.container.textContent = "";
};
cancelRendering_fn = function() {
  for (const thumbnail of this._thumbnails) {
    thumbnail.cancelRendering();
  }
};
ensurePdfPageLoaded_fn = async function(thumbView) {
  if (thumbView.pdfPage) {
    return thumbView.pdfPage;
  }
  try {
    const pdfPage = await this.pdfDocument.getPage(thumbView.id);
    if (!thumbView.pdfPage) {
      thumbView.setPdfPage(pdfPage);
    }
    return pdfPage;
  } catch (reason) {
    console.error("Unable to get page for thumb view", reason);
    return null;
  }
};
getScrollAhead_fn = function(visible) {
  var _a2, _b;
  if (((_a2 = visible.first) == null ? void 0 : _a2.id) === 1) {
    return true;
  } else if (((_b = visible.last) == null ? void 0 : _b.id) === this._thumbnails.length) {
    return false;
  }
  return this.scroll.down;
};
;
class AnnotationEditorLayerBuilder {
  constructor(options) {
    __privateAdd(this, _annotationLayer, null);
    __privateAdd(this, _drawLayer, null);
    __privateAdd(this, _onAppend, null);
    __privateAdd(this, _structTreeLayer, null);
    __privateAdd(this, _textLayer, null);
    __privateAdd(this, _uiManager3);
    this.pdfPage = options.pdfPage;
    this.accessibilityManager = options.accessibilityManager;
    this.l10n = options.l10n;
    this.l10n || (this.l10n = new genericl10n_GenericL10n());
    this.annotationEditorLayer = null;
    this.div = null;
    this._cancelled = false;
    __privateSet(this, _uiManager3, options.uiManager);
    __privateSet(this, _annotationLayer, options.annotationLayer || null);
    __privateSet(this, _textLayer, options.textLayer || null);
    __privateSet(this, _drawLayer, options.drawLayer || null);
    __privateSet(this, _onAppend, options.onAppend || null);
    __privateSet(this, _structTreeLayer, options.structTreeLayer || null);
  }
  async render(viewport, intent = "display") {
    var _a2;
    if (intent !== "display") {
      return;
    }
    if (this._cancelled) {
      return;
    }
    const clonedViewport = viewport.clone({
      dontFlip: true
    });
    if (this.div) {
      this.annotationEditorLayer.update({
        viewport: clonedViewport
      });
      this.show();
      return;
    }
    const div = this.div = document.createElement("div");
    div.className = "annotationEditorLayer";
    div.hidden = true;
    div.dir = __privateGet(this, _uiManager3).direction;
    (_a2 = __privateGet(this, _onAppend)) == null ? void 0 : _a2.call(this, div);
    this.annotationEditorLayer = new AnnotationEditorLayer({
      uiManager: __privateGet(this, _uiManager3),
      div,
      structTreeLayer: __privateGet(this, _structTreeLayer),
      accessibilityManager: this.accessibilityManager,
      pageIndex: this.pdfPage.pageNumber - 1,
      l10n: this.l10n,
      viewport: clonedViewport,
      annotationLayer: __privateGet(this, _annotationLayer),
      textLayer: __privateGet(this, _textLayer),
      drawLayer: __privateGet(this, _drawLayer)
    });
    const parameters = {
      viewport: clonedViewport,
      div,
      annotations: null,
      intent
    };
    this.annotationEditorLayer.render(parameters);
    this.show();
  }
  cancel() {
    this._cancelled = true;
    if (!this.div) {
      return;
    }
    this.annotationEditorLayer.destroy();
  }
  hide() {
    if (!this.div) {
      return;
    }
    this.annotationEditorLayer.pause(true);
    this.div.hidden = true;
  }
  show() {
    if (!this.div || this.annotationEditorLayer.isInvisible) {
      return;
    }
    this.div.hidden = false;
    this.annotationEditorLayer.pause(false);
  }
}
_annotationLayer = new WeakMap();
_drawLayer = new WeakMap();
_onAppend = new WeakMap();
_structTreeLayer = new WeakMap();
_textLayer = new WeakMap();
_uiManager3 = new WeakMap();
;
class AnnotationLayerBuilder {
  constructor({
    pdfPage,
    linkService,
    downloadManager,
    annotationStorage = null,
    imageResourcesPath = "",
    renderForms = true,
    enableScripting = false,
    hasJSActionsPromise = null,
    fieldObjectsPromise = null,
    annotationCanvasMap = null,
    accessibilityManager = null,
    annotationEditorUIManager = null,
    onAppend = null
  }) {
    __privateAdd(this, _AnnotationLayerBuilder_instances);
    __privateAdd(this, _onAppend2, null);
    __privateAdd(this, _eventAbortController3, null);
    this.pdfPage = pdfPage;
    this.linkService = linkService;
    this.downloadManager = downloadManager;
    this.imageResourcesPath = imageResourcesPath;
    this.renderForms = renderForms;
    this.annotationStorage = annotationStorage;
    this.enableScripting = enableScripting;
    this._hasJSActionsPromise = hasJSActionsPromise || Promise.resolve(false);
    this._fieldObjectsPromise = fieldObjectsPromise || Promise.resolve(null);
    this._annotationCanvasMap = annotationCanvasMap;
    this._accessibilityManager = accessibilityManager;
    this._annotationEditorUIManager = annotationEditorUIManager;
    __privateSet(this, _onAppend2, onAppend);
    this.annotationLayer = null;
    this.div = null;
    this._cancelled = false;
    this._eventBus = linkService.eventBus;
  }
  async render(viewport, options, intent = "display") {
    var _a2, _b;
    if (this.div) {
      if (this._cancelled || !this.annotationLayer) {
        return;
      }
      this.annotationLayer.update({
        viewport: viewport.clone({
          dontFlip: true
        })
      });
      return;
    }
    const [annotations, hasJSActions, fieldObjects] = await Promise.all([this.pdfPage.getAnnotations({
      intent
    }), this._hasJSActionsPromise, this._fieldObjectsPromise]);
    if (this._cancelled) {
      return;
    }
    const div = this.div = document.createElement("div");
    div.className = "annotationLayer";
    (_a2 = __privateGet(this, _onAppend2)) == null ? void 0 : _a2.call(this, div);
    if (annotations.length === 0) {
      this.hide();
      return;
    }
    this.annotationLayer = new AnnotationLayer({
      div,
      accessibilityManager: this._accessibilityManager,
      annotationCanvasMap: this._annotationCanvasMap,
      annotationEditorUIManager: this._annotationEditorUIManager,
      page: this.pdfPage,
      viewport: viewport.clone({
        dontFlip: true
      }),
      structTreeLayer: (options == null ? void 0 : options.structTreeLayer) || null
    });
    await this.annotationLayer.render({
      annotations,
      imageResourcesPath: this.imageResourcesPath,
      renderForms: this.renderForms,
      linkService: this.linkService,
      downloadManager: this.downloadManager,
      annotationStorage: this.annotationStorage,
      enableScripting: this.enableScripting,
      hasJSActions,
      fieldObjects
    });
    if (this.linkService.isInPresentationMode) {
      __privateMethod(this, _AnnotationLayerBuilder_instances, updatePresentationModeState_fn).call(this, PresentationModeState.FULLSCREEN);
    }
    if (!__privateGet(this, _eventAbortController3)) {
      __privateSet(this, _eventAbortController3, new AbortController());
      (_b = this._eventBus) == null ? void 0 : _b._on("presentationmodechanged", (evt) => {
        __privateMethod(this, _AnnotationLayerBuilder_instances, updatePresentationModeState_fn).call(this, evt.state);
      }, {
        signal: __privateGet(this, _eventAbortController3).signal
      });
    }
  }
  cancel() {
    var _a2;
    this._cancelled = true;
    (_a2 = __privateGet(this, _eventAbortController3)) == null ? void 0 : _a2.abort();
    __privateSet(this, _eventAbortController3, null);
  }
  hide() {
    if (!this.div) {
      return;
    }
    this.div.hidden = true;
  }
  hasEditableAnnotations() {
    var _a2;
    return !!((_a2 = this.annotationLayer) == null ? void 0 : _a2.hasEditableAnnotations());
  }
}
_onAppend2 = new WeakMap();
_eventAbortController3 = new WeakMap();
_AnnotationLayerBuilder_instances = new WeakSet();
updatePresentationModeState_fn = function(state) {
  if (!this.div) {
    return;
  }
  let disableFormElements = false;
  switch (state) {
    case PresentationModeState.FULLSCREEN:
      disableFormElements = true;
      break;
    case PresentationModeState.NORMAL:
      break;
    default:
      return;
  }
  for (const section of this.div.childNodes) {
    if (section.hasAttribute("data-internal-link")) {
      continue;
    }
    section.inert = disableFormElements;
  }
};
;
class DrawLayerBuilder {
  constructor(options) {
    __privateAdd(this, _drawLayer2, null);
    this.pageIndex = options.pageIndex;
  }
  async render(intent = "display") {
    if (intent !== "display" || __privateGet(this, _drawLayer2) || this._cancelled) {
      return;
    }
    __privateSet(this, _drawLayer2, new DrawLayer({
      pageIndex: this.pageIndex
    }));
  }
  cancel() {
    this._cancelled = true;
    if (!__privateGet(this, _drawLayer2)) {
      return;
    }
    __privateGet(this, _drawLayer2).destroy();
    __privateSet(this, _drawLayer2, null);
  }
  setParent(parent2) {
    var _a2;
    (_a2 = __privateGet(this, _drawLayer2)) == null ? void 0 : _a2.setParent(parent2);
  }
  getDrawLayer() {
    return __privateGet(this, _drawLayer2);
  }
}
_drawLayer2 = new WeakMap();
;
const PDF_ROLE_TO_HTML_ROLE = {
  Document: null,
  DocumentFragment: null,
  Part: "group",
  Sect: "group",
  Div: "group",
  Aside: "note",
  NonStruct: "none",
  P: null,
  H: "heading",
  Title: null,
  FENote: "note",
  Sub: "group",
  Lbl: null,
  Span: null,
  Em: null,
  Strong: null,
  Link: "link",
  Annot: "note",
  Form: "form",
  Ruby: null,
  RB: null,
  RT: null,
  RP: null,
  Warichu: null,
  WT: null,
  WP: null,
  L: "list",
  LI: "listitem",
  LBody: null,
  Table: "table",
  TR: "row",
  TH: "columnheader",
  TD: "cell",
  THead: "columnheader",
  TBody: null,
  TFoot: null,
  Caption: null,
  Figure: "figure",
  Formula: null,
  Artifact: null
};
const HEADING_PATTERN = /^H(\d+)$/;
class StructTreeLayerBuilder {
  constructor(pdfPage, rawDims) {
    __privateAdd(this, _StructTreeLayerBuilder_instances);
    __privateAdd(this, _promise);
    __privateAdd(this, _treeDom, null);
    __privateAdd(this, _treePromise);
    __privateAdd(this, _elementAttributes, /* @__PURE__ */ new Map());
    __privateAdd(this, _rawDims);
    __privateAdd(this, _elementsToAddToTextLayer, null);
    __privateSet(this, _promise, pdfPage.getStructTree());
    __privateSet(this, _rawDims, rawDims);
  }
  async render() {
    var _a2;
    if (__privateGet(this, _treePromise)) {
      return __privateGet(this, _treePromise);
    }
    const {
      promise,
      resolve,
      reject
    } = Promise.withResolvers();
    __privateSet(this, _treePromise, promise);
    try {
      __privateSet(this, _treeDom, __privateMethod(this, _StructTreeLayerBuilder_instances, walk_fn).call(this, await __privateGet(this, _promise)));
    } catch (ex) {
      reject(ex);
    }
    __privateSet(this, _promise, null);
    (_a2 = __privateGet(this, _treeDom)) == null ? void 0 : _a2.classList.add("structTree");
    resolve(__privateGet(this, _treeDom));
    return promise;
  }
  async getAriaAttributes(annotationId) {
    try {
      await this.render();
      return __privateGet(this, _elementAttributes).get(annotationId);
    } catch {
    }
    return null;
  }
  hide() {
    if (__privateGet(this, _treeDom) && !__privateGet(this, _treeDom).hidden) {
      __privateGet(this, _treeDom).hidden = true;
    }
  }
  show() {
    var _a2;
    if ((_a2 = __privateGet(this, _treeDom)) == null ? void 0 : _a2.hidden) {
      __privateGet(this, _treeDom).hidden = false;
    }
  }
  addElementsToTextLayer() {
    var _a2;
    if (!__privateGet(this, _elementsToAddToTextLayer)) {
      return;
    }
    for (const [id, img] of __privateGet(this, _elementsToAddToTextLayer)) {
      (_a2 = document.getElementById(id)) == null ? void 0 : _a2.append(img);
    }
    __privateGet(this, _elementsToAddToTextLayer).clear();
    __privateSet(this, _elementsToAddToTextLayer, null);
  }
}
_promise = new WeakMap();
_treeDom = new WeakMap();
_treePromise = new WeakMap();
_elementAttributes = new WeakMap();
_rawDims = new WeakMap();
_elementsToAddToTextLayer = new WeakMap();
_StructTreeLayerBuilder_instances = new WeakSet();
setAttributes_fn = function(structElement, htmlElement) {
  const {
    alt,
    id,
    lang
  } = structElement;
  if (alt !== void 0) {
    let added = false;
    const label = removeNullCharacters(alt);
    for (const child of structElement.children) {
      if (child.type === "annotation") {
        let attrs = __privateGet(this, _elementAttributes).get(child.id);
        if (!attrs) {
          attrs = /* @__PURE__ */ new Map();
          __privateGet(this, _elementAttributes).set(child.id, attrs);
        }
        attrs.set("aria-label", label);
        added = true;
      }
    }
    if (!added) {
      htmlElement.setAttribute("aria-label", label);
    }
  }
  if (id !== void 0) {
    htmlElement.setAttribute("aria-owns", id);
  }
  if (lang !== void 0) {
    htmlElement.setAttribute("lang", removeNullCharacters(lang, true));
  }
};
addImageInTextLayer_fn = function(node, element) {
  const {
    alt,
    bbox,
    children
  } = node;
  const child = children == null ? void 0 : children[0];
  if (!__privateGet(this, _rawDims) || !alt || !bbox || (child == null ? void 0 : child.type) !== "content") {
    return false;
  }
  const {
    id
  } = child;
  if (!id) {
    return false;
  }
  element.setAttribute("aria-owns", id);
  const img = document.createElement("span");
  (__privateGet(this, _elementsToAddToTextLayer) || __privateSet(this, _elementsToAddToTextLayer, /* @__PURE__ */ new Map())).set(id, img);
  img.setAttribute("role", "img");
  img.setAttribute("aria-label", removeNullCharacters(alt));
  const {
    pageHeight,
    pageX,
    pageY
  } = __privateGet(this, _rawDims);
  const calc = "calc(var(--scale-factor)*";
  const {
    style
  } = img;
  style.width = `${calc}${bbox[2] - bbox[0]}px)`;
  style.height = `${calc}${bbox[3] - bbox[1]}px)`;
  style.left = `${calc}${bbox[0] - pageX}px)`;
  style.top = `${calc}${pageHeight - bbox[3] + pageY}px)`;
  return true;
};
walk_fn = function(node) {
  if (!node) {
    return null;
  }
  const element = document.createElement("span");
  if ("role" in node) {
    const {
      role
    } = node;
    const match2 = role.match(HEADING_PATTERN);
    if (match2) {
      element.setAttribute("role", "heading");
      element.setAttribute("aria-level", match2[1]);
    } else if (PDF_ROLE_TO_HTML_ROLE[role]) {
      element.setAttribute("role", PDF_ROLE_TO_HTML_ROLE[role]);
    }
    if (role === "Figure" && __privateMethod(this, _StructTreeLayerBuilder_instances, addImageInTextLayer_fn).call(this, node, element)) {
      return element;
    }
  }
  __privateMethod(this, _StructTreeLayerBuilder_instances, setAttributes_fn).call(this, node, element);
  if (node.children) {
    if (node.children.length === 1 && "id" in node.children[0]) {
      __privateMethod(this, _StructTreeLayerBuilder_instances, setAttributes_fn).call(this, node.children[0], element);
    } else {
      for (const kid of node.children) {
        element.append(__privateMethod(this, _StructTreeLayerBuilder_instances, walk_fn).call(this, kid));
      }
    }
  }
  return element;
};
;
const _TextAccessibilityManager = class _TextAccessibilityManager {
  constructor() {
    __privateAdd(this, _TextAccessibilityManager_instances);
    __privateAdd(this, _enabled, false);
    __privateAdd(this, _textChildren, null);
    __privateAdd(this, _textNodes, /* @__PURE__ */ new Map());
    __privateAdd(this, _waitingElements, /* @__PURE__ */ new Map());
  }
  setTextMapping(textDivs) {
    __privateSet(this, _textChildren, textDivs);
  }
  enable() {
    if (__privateGet(this, _enabled)) {
      throw new Error("TextAccessibilityManager is already enabled.");
    }
    if (!__privateGet(this, _textChildren)) {
      throw new Error("Text divs and strings have not been set.");
    }
    __privateSet(this, _enabled, true);
    __privateSet(this, _textChildren, __privateGet(this, _textChildren).slice());
    __privateGet(this, _textChildren).sort(__privateMethod(_TextAccessibilityManager, _TextAccessibilityManager_static, compareElementPositions_fn));
    if (__privateGet(this, _textNodes).size > 0) {
      const textChildren = __privateGet(this, _textChildren);
      for (const [id, nodeIndex] of __privateGet(this, _textNodes)) {
        const element = document.getElementById(id);
        if (!element) {
          __privateGet(this, _textNodes).delete(id);
          continue;
        }
        __privateMethod(this, _TextAccessibilityManager_instances, addIdToAriaOwns_fn).call(this, id, textChildren[nodeIndex]);
      }
    }
    for (const [element, isRemovable] of __privateGet(this, _waitingElements)) {
      this.addPointerInTextLayer(element, isRemovable);
    }
    __privateGet(this, _waitingElements).clear();
  }
  disable() {
    if (!__privateGet(this, _enabled)) {
      return;
    }
    __privateGet(this, _waitingElements).clear();
    __privateSet(this, _textChildren, null);
    __privateSet(this, _enabled, false);
  }
  removePointerInTextLayer(element) {
    if (!__privateGet(this, _enabled)) {
      __privateGet(this, _waitingElements).delete(element);
      return;
    }
    const children = __privateGet(this, _textChildren);
    if (!children || children.length === 0) {
      return;
    }
    const {
      id
    } = element;
    const nodeIndex = __privateGet(this, _textNodes).get(id);
    if (nodeIndex === void 0) {
      return;
    }
    const node = children[nodeIndex];
    __privateGet(this, _textNodes).delete(id);
    let owns = node.getAttribute("aria-owns");
    if (owns == null ? void 0 : owns.includes(id)) {
      owns = owns.split(" ").filter((x) => x !== id).join(" ");
      if (owns) {
        node.setAttribute("aria-owns", owns);
      } else {
        node.removeAttribute("aria-owns");
        node.setAttribute("role", "presentation");
      }
    }
  }
  addPointerInTextLayer(element, isRemovable) {
    const {
      id
    } = element;
    if (!id) {
      return null;
    }
    if (!__privateGet(this, _enabled)) {
      __privateGet(this, _waitingElements).set(element, isRemovable);
      return null;
    }
    if (isRemovable) {
      this.removePointerInTextLayer(element);
    }
    const children = __privateGet(this, _textChildren);
    if (!children || children.length === 0) {
      return null;
    }
    const index = binarySearchFirstItem(children, (node) => {
      var _a2;
      return __privateMethod(_a2 = _TextAccessibilityManager, _TextAccessibilityManager_static, compareElementPositions_fn).call(_a2, element, node) < 0;
    });
    const nodeIndex = Math.max(0, index - 1);
    const child = children[nodeIndex];
    __privateMethod(this, _TextAccessibilityManager_instances, addIdToAriaOwns_fn).call(this, id, child);
    __privateGet(this, _textNodes).set(id, nodeIndex);
    const parent2 = child.parentNode;
    return (parent2 == null ? void 0 : parent2.classList.contains("markedContent")) ? parent2.id : null;
  }
  moveElementInDOM(container, element, contentElement, isRemovable) {
    const id = this.addPointerInTextLayer(contentElement, isRemovable);
    if (!container.hasChildNodes()) {
      container.append(element);
      return id;
    }
    const children = Array.from(container.childNodes).filter((node) => node !== element);
    if (children.length === 0) {
      return id;
    }
    const elementToCompare = contentElement || element;
    const index = binarySearchFirstItem(children, (node) => {
      var _a2;
      return __privateMethod(_a2 = _TextAccessibilityManager, _TextAccessibilityManager_static, compareElementPositions_fn).call(_a2, elementToCompare, node) < 0;
    });
    if (index === 0) {
      children[0].before(element);
    } else {
      children[index - 1].after(element);
    }
    return id;
  }
};
_enabled = new WeakMap();
_textChildren = new WeakMap();
_textNodes = new WeakMap();
_waitingElements = new WeakMap();
_TextAccessibilityManager_static = new WeakSet();
compareElementPositions_fn = function(e1, e2) {
  const rect1 = e1.getBoundingClientRect();
  const rect2 = e2.getBoundingClientRect();
  if (rect1.width === 0 && rect1.height === 0) {
    return 1;
  }
  if (rect2.width === 0 && rect2.height === 0) {
    return -1;
  }
  const top1 = rect1.y;
  const bot1 = rect1.y + rect1.height;
  const mid1 = rect1.y + rect1.height / 2;
  const top2 = rect2.y;
  const bot2 = rect2.y + rect2.height;
  const mid2 = rect2.y + rect2.height / 2;
  if (mid1 <= top2 && mid2 >= bot1) {
    return -1;
  }
  if (mid2 <= top1 && mid1 >= bot2) {
    return 1;
  }
  const centerX1 = rect1.x + rect1.width / 2;
  const centerX2 = rect2.x + rect2.width / 2;
  return centerX1 - centerX2;
};
_TextAccessibilityManager_instances = new WeakSet();
addIdToAriaOwns_fn = function(id, node) {
  const owns = node.getAttribute("aria-owns");
  if (!(owns == null ? void 0 : owns.includes(id))) {
    node.setAttribute("aria-owns", owns ? `${owns} ${id}` : id);
  }
  node.removeAttribute("role");
};
__privateAdd(_TextAccessibilityManager, _TextAccessibilityManager_static);
let TextAccessibilityManager = _TextAccessibilityManager;
;
class TextHighlighter {
  constructor({
    findController,
    eventBus,
    pageIndex
  }) {
    __privateAdd(this, _eventAbortController4, null);
    this.findController = findController;
    this.matches = [];
    this.eventBus = eventBus;
    this.pageIdx = pageIndex;
    this.textDivs = null;
    this.textContentItemsStr = null;
    this.enabled = false;
  }
  setTextMapping(divs, texts) {
    this.textDivs = divs;
    this.textContentItemsStr = texts;
  }
  enable() {
    if (!this.textDivs || !this.textContentItemsStr) {
      throw new Error("Text divs and strings have not been set.");
    }
    if (this.enabled) {
      throw new Error("TextHighlighter is already enabled.");
    }
    this.enabled = true;
    if (!__privateGet(this, _eventAbortController4)) {
      __privateSet(this, _eventAbortController4, new AbortController());
      this.eventBus._on("updatetextlayermatches", (evt) => {
        if (evt.pageIndex === this.pageIdx || evt.pageIndex === -1) {
          this._updateMatches();
        }
      }, {
        signal: __privateGet(this, _eventAbortController4).signal
      });
    }
    this._updateMatches();
  }
  disable() {
    var _a2;
    if (!this.enabled) {
      return;
    }
    this.enabled = false;
    (_a2 = __privateGet(this, _eventAbortController4)) == null ? void 0 : _a2.abort();
    __privateSet(this, _eventAbortController4, null);
    this._updateMatches(true);
  }
  _convertMatches(matches, matchesLength) {
    if (!matches) {
      return [];
    }
    const {
      textContentItemsStr
    } = this;
    let i = 0, iIndex = 0;
    const end = textContentItemsStr.length - 1;
    const result = [];
    for (let m = 0, mm = matches.length; m < mm; m++) {
      let matchIdx = matches[m];
      while (i !== end && matchIdx >= iIndex + textContentItemsStr[i].length) {
        iIndex += textContentItemsStr[i].length;
        i++;
      }
      if (i === textContentItemsStr.length) {
        console.error("Could not find a matching mapping");
      }
      const match2 = {
        begin: {
          divIdx: i,
          offset: matchIdx - iIndex
        }
      };
      matchIdx += matchesLength[m];
      while (i !== end && matchIdx > iIndex + textContentItemsStr[i].length) {
        iIndex += textContentItemsStr[i].length;
        i++;
      }
      match2.end = {
        divIdx: i,
        offset: matchIdx - iIndex
      };
      result.push(match2);
    }
    return result;
  }
  _renderMatches(matches) {
    if (matches.length === 0) {
      return;
    }
    const {
      findController,
      pageIdx
    } = this;
    const {
      textContentItemsStr,
      textDivs
    } = this;
    const isSelectedPage = pageIdx === findController.selected.pageIdx;
    const selectedMatchIdx = findController.selected.matchIdx;
    const highlightAll = findController.state.highlightAll;
    let prevEnd = null;
    const infinity = {
      divIdx: -1,
      offset: void 0
    };
    function beginText(begin, className) {
      const divIdx = begin.divIdx;
      textDivs[divIdx].textContent = "";
      return appendTextToDiv(divIdx, 0, begin.offset, className);
    }
    function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
      let div = textDivs[divIdx];
      if (div.nodeType === Node.TEXT_NODE) {
        const span = document.createElement("span");
        div.before(span);
        span.append(div);
        textDivs[divIdx] = span;
        div = span;
      }
      const content = textContentItemsStr[divIdx].substring(fromOffset, toOffset);
      const node = document.createTextNode(content);
      if (className) {
        const span = document.createElement("span");
        span.className = `${className} appended`;
        span.append(node);
        div.append(span);
        if (className.includes("selected")) {
          const {
            left
          } = span.getClientRects()[0];
          const parentLeft = div.getBoundingClientRect().left;
          return left - parentLeft;
        }
        return 0;
      }
      div.append(node);
      return 0;
    }
    let i0 = selectedMatchIdx, i1 = i0 + 1;
    if (highlightAll) {
      i0 = 0;
      i1 = matches.length;
    } else if (!isSelectedPage) {
      return;
    }
    let lastDivIdx = -1;
    let lastOffset = -1;
    for (let i = i0; i < i1; i++) {
      const match2 = matches[i];
      const begin = match2.begin;
      if (begin.divIdx === lastDivIdx && begin.offset === lastOffset) {
        continue;
      }
      lastDivIdx = begin.divIdx;
      lastOffset = begin.offset;
      const end = match2.end;
      const isSelected = isSelectedPage && i === selectedMatchIdx;
      const highlightSuffix = isSelected ? " selected" : "";
      let selectedLeft = 0;
      if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
        if (prevEnd !== null) {
          appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
        }
        beginText(begin);
      } else {
        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
      }
      if (begin.divIdx === end.divIdx) {
        selectedLeft = appendTextToDiv(begin.divIdx, begin.offset, end.offset, "highlight" + highlightSuffix);
      } else {
        selectedLeft = appendTextToDiv(begin.divIdx, begin.offset, infinity.offset, "highlight begin" + highlightSuffix);
        for (let n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
          textDivs[n0].className = "highlight middle" + highlightSuffix;
        }
        beginText(end, "highlight end" + highlightSuffix);
      }
      prevEnd = end;
      if (isSelected) {
        findController.scrollMatchIntoView({
          element: textDivs[begin.divIdx],
          selectedLeft,
          pageIndex: pageIdx,
          matchIndex: selectedMatchIdx
        });
      }
    }
    if (prevEnd) {
      appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
    }
  }
  _updateMatches(reset = false) {
    if (!this.enabled && !reset) {
      return;
    }
    const {
      findController,
      matches,
      pageIdx
    } = this;
    const {
      textContentItemsStr,
      textDivs
    } = this;
    let clearedUntilDivIdx = -1;
    for (const match2 of matches) {
      const begin = Math.max(clearedUntilDivIdx, match2.begin.divIdx);
      for (let n = begin, end = match2.end.divIdx; n <= end; n++) {
        const div = textDivs[n];
        div.textContent = textContentItemsStr[n];
        div.className = "";
      }
      clearedUntilDivIdx = match2.end.divIdx + 1;
    }
    if (!(findController == null ? void 0 : findController.highlightMatches) || reset) {
      return;
    }
    const pageMatches = findController.pageMatches[pageIdx] || null;
    const pageMatchesLength = findController.pageMatchesLength[pageIdx] || null;
    this.matches = this._convertMatches(pageMatches, pageMatchesLength);
    this._renderMatches(this.matches);
  }
}
_eventAbortController4 = new WeakMap();
;
const _TextLayerBuilder = class _TextLayerBuilder {
  constructor({
    pdfPage,
    highlighter = null,
    accessibilityManager = null,
    enablePermissions = false,
    onAppend = null
  }) {
    __privateAdd(this, _TextLayerBuilder_instances);
    __privateAdd(this, _enablePermissions, false);
    __privateAdd(this, _onAppend3, null);
    __privateAdd(this, _renderingDone, false);
    __privateAdd(this, _textLayer2, null);
    this.pdfPage = pdfPage;
    this.highlighter = highlighter;
    this.accessibilityManager = accessibilityManager;
    __privateSet(this, _enablePermissions, enablePermissions === true);
    __privateSet(this, _onAppend3, onAppend);
    this.div = document.createElement("div");
    this.div.tabIndex = 0;
    this.div.className = "textLayer";
  }
  async render(viewport, textContentParams = null) {
    var _a2, _b, _c, _d, _e;
    if (__privateGet(this, _renderingDone) && __privateGet(this, _textLayer2)) {
      __privateGet(this, _textLayer2).update({
        viewport,
        onBefore: this.hide.bind(this)
      });
      this.show();
      return;
    }
    this.cancel();
    __privateSet(this, _textLayer2, new TextLayer({
      textContentSource: this.pdfPage.streamTextContent(textContentParams || {
        includeMarkedContent: true,
        disableNormalization: true
      }),
      container: this.div,
      viewport
    }));
    const {
      textDivs,
      textContentItemsStr
    } = __privateGet(this, _textLayer2);
    (_a2 = this.highlighter) == null ? void 0 : _a2.setTextMapping(textDivs, textContentItemsStr);
    (_b = this.accessibilityManager) == null ? void 0 : _b.setTextMapping(textDivs);
    await __privateGet(this, _textLayer2).render();
    __privateSet(this, _renderingDone, true);
    const endOfContent = document.createElement("div");
    endOfContent.className = "endOfContent";
    this.div.append(endOfContent);
    __privateMethod(this, _TextLayerBuilder_instances, bindMouse_fn).call(this, endOfContent);
    (_c = __privateGet(this, _onAppend3)) == null ? void 0 : _c.call(this, this.div);
    (_d = this.highlighter) == null ? void 0 : _d.enable();
    (_e = this.accessibilityManager) == null ? void 0 : _e.enable();
  }
  hide() {
    var _a2;
    if (!this.div.hidden && __privateGet(this, _renderingDone)) {
      (_a2 = this.highlighter) == null ? void 0 : _a2.disable();
      this.div.hidden = true;
    }
  }
  show() {
    var _a2;
    if (this.div.hidden && __privateGet(this, _renderingDone)) {
      this.div.hidden = false;
      (_a2 = this.highlighter) == null ? void 0 : _a2.enable();
    }
  }
  cancel() {
    var _a2, _b, _c, _d;
    (_a2 = __privateGet(this, _textLayer2)) == null ? void 0 : _a2.cancel();
    __privateSet(this, _textLayer2, null);
    (_b = this.highlighter) == null ? void 0 : _b.disable();
    (_c = this.accessibilityManager) == null ? void 0 : _c.disable();
    __privateMethod(_d = _TextLayerBuilder, _TextLayerBuilder_static, removeGlobalSelectionListener_fn).call(_d, this.div);
  }
};
_enablePermissions = new WeakMap();
_onAppend3 = new WeakMap();
_renderingDone = new WeakMap();
_textLayer2 = new WeakMap();
_textLayers = new WeakMap();
_selectionChangeAbortController = new WeakMap();
_TextLayerBuilder_instances = new WeakSet();
bindMouse_fn = function(end) {
  var _a2;
  const {
    div
  } = this;
  div.addEventListener("mousedown", () => {
    div.classList.add("selecting");
  });
  div.addEventListener("copy", (event) => {
    if (!__privateGet(this, _enablePermissions)) {
      const selection = document.getSelection();
      event.clipboardData.setData("text/plain", removeNullCharacters(normalizeUnicode(selection.toString())));
    }
    stopEvent(event);
  });
  __privateGet(_TextLayerBuilder, _textLayers).set(div, end);
  __privateMethod(_a2 = _TextLayerBuilder, _TextLayerBuilder_static, enableGlobalSelectionListener_fn).call(_a2);
};
_TextLayerBuilder_static = new WeakSet();
removeGlobalSelectionListener_fn = function(textLayerDiv) {
  var _a2;
  __privateGet(this, _textLayers).delete(textLayerDiv);
  if (__privateGet(this, _textLayers).size === 0) {
    (_a2 = __privateGet(this, _selectionChangeAbortController)) == null ? void 0 : _a2.abort();
    __privateSet(this, _selectionChangeAbortController, null);
  }
};
enableGlobalSelectionListener_fn = function() {
  if (__privateGet(this, _selectionChangeAbortController)) {
    return;
  }
  __privateSet(this, _selectionChangeAbortController, new AbortController());
  const {
    signal
  } = __privateGet(this, _selectionChangeAbortController);
  const reset = (end, textLayer) => {
    textLayer.append(end);
    end.style.width = "";
    end.style.height = "";
    textLayer.classList.remove("selecting");
  };
  let isPointerDown = false;
  document.addEventListener("pointerdown", () => {
    isPointerDown = true;
  }, {
    signal
  });
  document.addEventListener("pointerup", () => {
    isPointerDown = false;
    __privateGet(this, _textLayers).forEach(reset);
  }, {
    signal
  });
  window.addEventListener("blur", () => {
    isPointerDown = false;
    __privateGet(this, _textLayers).forEach(reset);
  }, {
    signal
  });
  document.addEventListener("keyup", () => {
    if (!isPointerDown) {
      __privateGet(this, _textLayers).forEach(reset);
    }
  }, {
    signal
  });
  var isFirefox, prevRange;
  document.addEventListener("selectionchange", () => {
    var _a2;
    const selection = document.getSelection();
    if (selection.rangeCount === 0) {
      __privateGet(this, _textLayers).forEach(reset);
      return;
    }
    const activeTextLayers = /* @__PURE__ */ new Set();
    for (let i = 0; i < selection.rangeCount; i++) {
      const range2 = selection.getRangeAt(i);
      for (const textLayerDiv of __privateGet(this, _textLayers).keys()) {
        if (!activeTextLayers.has(textLayerDiv) && range2.intersectsNode(textLayerDiv)) {
          activeTextLayers.add(textLayerDiv);
        }
      }
    }
    for (const [textLayerDiv, endDiv2] of __privateGet(this, _textLayers)) {
      if (activeTextLayers.has(textLayerDiv)) {
        textLayerDiv.classList.add("selecting");
      } else {
        reset(endDiv2, textLayerDiv);
      }
    }
    isFirefox != null ? isFirefox : isFirefox = getComputedStyle(__privateGet(this, _textLayers).values().next().value).getPropertyValue("-moz-user-select") === "none";
    if (isFirefox) {
      return;
    }
    const range = selection.getRangeAt(0);
    const modifyStart = prevRange && (range.compareBoundaryPoints(Range.END_TO_END, prevRange) === 0 || range.compareBoundaryPoints(Range.START_TO_END, prevRange) === 0);
    let anchor = modifyStart ? range.startContainer : range.endContainer;
    if (anchor.nodeType === Node.TEXT_NODE) {
      anchor = anchor.parentNode;
    }
    const parentTextLayer = (_a2 = anchor.parentElement) == null ? void 0 : _a2.closest(".textLayer");
    const endDiv = __privateGet(this, _textLayers).get(parentTextLayer);
    if (endDiv) {
      endDiv.style.width = parentTextLayer.style.width;
      endDiv.style.height = parentTextLayer.style.height;
      anchor.parentElement.insertBefore(endDiv, modifyStart ? anchor : anchor.nextSibling);
    }
    prevRange = range.cloneRange();
  }, {
    signal
  });
};
__privateAdd(_TextLayerBuilder, _TextLayerBuilder_static);
__privateAdd(_TextLayerBuilder, _textLayers, /* @__PURE__ */ new Map());
__privateAdd(_TextLayerBuilder, _selectionChangeAbortController, null);
let TextLayerBuilder = _TextLayerBuilder;
;
const DEFAULT_LAYER_PROPERTIES = null;
const LAYERS_ORDER = /* @__PURE__ */ new Map([["canvasWrapper", 0], ["textLayer", 1], ["annotationLayer", 2], ["annotationEditorLayer", 3], ["xfaLayer", 3]]);
class PDFPageView {
  constructor(options) {
    __privateAdd(this, _PDFPageView_instances);
    __privateAdd(this, _annotationMode, AnnotationMode.ENABLE_FORMS);
    __privateAdd(this, _canvasWrapper, null);
    __privateAdd(this, _enableHWA, false);
    __privateAdd(this, _hasRestrictedScaling, false);
    __privateAdd(this, _isEditing2, false);
    __privateAdd(this, _layerProperties, null);
    __privateAdd(this, _loadingId, null);
    __privateAdd(this, _originalViewport, null);
    __privateAdd(this, _previousRotation, null);
    __privateAdd(this, _scaleRoundX, 1);
    __privateAdd(this, _scaleRoundY, 1);
    __privateAdd(this, _renderError, null);
    __privateAdd(this, _renderingState, RenderingStates.INITIAL);
    __privateAdd(this, _textLayerMode, TextLayerMode.ENABLE);
    __privateAdd(this, _useThumbnailCanvas, {
      directDrawing: true,
      initialOptionalContent: true,
      regularAnnotations: true
    });
    __privateAdd(this, _layers, [null, null, null, null]);
    var _a2, _b, _c, _d, _e;
    const container = options.container;
    const defaultViewport = options.defaultViewport;
    this.id = options.id;
    this.renderingId = "page" + this.id;
    __privateSet(this, _layerProperties, options.layerProperties || DEFAULT_LAYER_PROPERTIES);
    this.pdfPage = null;
    this.pageLabel = null;
    this.rotation = 0;
    this.scale = options.scale || DEFAULT_SCALE;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = options.optionalContentConfigPromise || null;
    __privateSet(this, _textLayerMode, (_a2 = options.textLayerMode) != null ? _a2 : TextLayerMode.ENABLE);
    __privateSet(this, _annotationMode, (_b = options.annotationMode) != null ? _b : AnnotationMode.ENABLE_FORMS);
    this.imageResourcesPath = options.imageResourcesPath || "";
    this.maxCanvasPixels = (_c = options.maxCanvasPixels) != null ? _c : AppOptions.get("maxCanvasPixels");
    this.pageColors = options.pageColors || null;
    __privateSet(this, _enableHWA, options.enableHWA || false);
    this.eventBus = options.eventBus;
    this.renderingQueue = options.renderingQueue;
    this.l10n = options.l10n;
    this.l10n || (this.l10n = new genericl10n_GenericL10n());
    this.renderTask = null;
    this.resume = null;
    this._isStandalone = !((_d = this.renderingQueue) == null ? void 0 : _d.hasViewer());
    this._container = container;
    this._annotationCanvasMap = null;
    this.annotationLayer = null;
    this.annotationEditorLayer = null;
    this.textLayer = null;
    this.xfaLayer = null;
    this.structTreeLayer = null;
    this.drawLayer = null;
    const div = document.createElement("div");
    div.className = "page";
    div.setAttribute("data-page-number", this.id);
    div.setAttribute("role", "region");
    div.setAttribute("data-l10n-id", "pdfjs-page-landmark");
    div.setAttribute("data-l10n-args", JSON.stringify({
      page: this.id
    }));
    this.div = div;
    __privateMethod(this, _PDFPageView_instances, setDimensions_fn).call(this);
    container == null ? void 0 : container.append(div);
    if (this._isStandalone) {
      container == null ? void 0 : container.style.setProperty("--scale-factor", this.scale * PixelsPerInch.PDF_TO_CSS_UNITS);
      if ((_e = this.pageColors) == null ? void 0 : _e.background) {
        container == null ? void 0 : container.style.setProperty("--page-bg-color", this.pageColors.background);
      }
      const {
        optionalContentConfigPromise
      } = options;
      if (optionalContentConfigPromise) {
        optionalContentConfigPromise.then((optionalContentConfig) => {
          if (optionalContentConfigPromise !== this._optionalContentConfigPromise) {
            return;
          }
          __privateGet(this, _useThumbnailCanvas).initialOptionalContent = optionalContentConfig.hasInitialVisibility;
        });
      }
      if (!options.l10n) {
        this.l10n.translate(this.div);
      }
    }
  }
  get renderingState() {
    return __privateGet(this, _renderingState);
  }
  set renderingState(state) {
    if (state === __privateGet(this, _renderingState)) {
      return;
    }
    __privateSet(this, _renderingState, state);
    if (__privateGet(this, _loadingId)) {
      clearTimeout(__privateGet(this, _loadingId));
      __privateSet(this, _loadingId, null);
    }
    switch (state) {
      case RenderingStates.PAUSED:
        this.div.classList.remove("loading");
        break;
      case RenderingStates.RUNNING:
        this.div.classList.add("loadingIcon");
        __privateSet(this, _loadingId, setTimeout(() => {
          this.div.classList.add("loading");
          __privateSet(this, _loadingId, null);
        }, 0));
        break;
      case RenderingStates.INITIAL:
      case RenderingStates.FINISHED:
        this.div.classList.remove("loadingIcon", "loading");
        break;
    }
  }
  setPdfPage(pdfPage) {
    var _a2, _b, _c, _d;
    if (this._isStandalone && (((_a2 = this.pageColors) == null ? void 0 : _a2.foreground) === "CanvasText" || ((_b = this.pageColors) == null ? void 0 : _b.background) === "Canvas")) {
      (_c = this._container) == null ? void 0 : _c.style.setProperty("--hcm-highlight-filter", pdfPage.filterFactory.addHighlightHCMFilter("highlight", "CanvasText", "Canvas", "HighlightText", "Highlight"));
      (_d = this._container) == null ? void 0 : _d.style.setProperty("--hcm-highlight-selected-filter", pdfPage.filterFactory.addHighlightHCMFilter("highlight_selected", "CanvasText", "Canvas", "HighlightText", "Highlight"));
    }
    this.pdfPage = pdfPage;
    this.pdfPageRotate = pdfPage.rotate;
    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = pdfPage.getViewport({
      scale: this.scale * PixelsPerInch.PDF_TO_CSS_UNITS,
      rotation: totalRotation
    });
    __privateMethod(this, _PDFPageView_instances, setDimensions_fn).call(this);
    this.reset();
  }
  destroy() {
    var _a2;
    this.reset();
    (_a2 = this.pdfPage) == null ? void 0 : _a2.cleanup();
  }
  hasEditableAnnotations() {
    var _a2;
    return !!((_a2 = this.annotationLayer) == null ? void 0 : _a2.hasEditableAnnotations());
  }
  get _textHighlighter() {
    return shadow(this, "_textHighlighter", new TextHighlighter({
      pageIndex: this.id - 1,
      eventBus: this.eventBus,
      findController: __privateGet(this, _layerProperties).findController
    }));
  }
  reset({
    keepAnnotationLayer = false,
    keepAnnotationEditorLayer = false,
    keepXfaLayer = false,
    keepTextLayer = false,
    keepCanvasWrapper = false
  } = {}) {
    var _a2, _b, _c, _d, _e;
    this.cancelRendering({
      keepAnnotationLayer,
      keepAnnotationEditorLayer,
      keepXfaLayer,
      keepTextLayer
    });
    this.renderingState = RenderingStates.INITIAL;
    const div = this.div;
    const childNodes = div.childNodes, annotationLayerNode = keepAnnotationLayer && ((_a2 = this.annotationLayer) == null ? void 0 : _a2.div) || null, annotationEditorLayerNode = keepAnnotationEditorLayer && ((_b = this.annotationEditorLayer) == null ? void 0 : _b.div) || null, xfaLayerNode = keepXfaLayer && ((_c = this.xfaLayer) == null ? void 0 : _c.div) || null, textLayerNode = keepTextLayer && ((_d = this.textLayer) == null ? void 0 : _d.div) || null, canvasWrapperNode = keepCanvasWrapper && __privateGet(this, _canvasWrapper) || null;
    for (let i = childNodes.length - 1; i >= 0; i--) {
      const node = childNodes[i];
      switch (node) {
        case annotationLayerNode:
        case annotationEditorLayerNode:
        case xfaLayerNode:
        case textLayerNode:
        case canvasWrapperNode:
          continue;
      }
      node.remove();
      const layerIndex = __privateGet(this, _layers).indexOf(node);
      if (layerIndex >= 0) {
        __privateGet(this, _layers)[layerIndex] = null;
      }
    }
    div.removeAttribute("data-loaded");
    if (annotationLayerNode) {
      this.annotationLayer.hide();
    }
    if (annotationEditorLayerNode) {
      this.annotationEditorLayer.hide();
    }
    if (xfaLayerNode) {
      this.xfaLayer.hide();
    }
    if (textLayerNode) {
      this.textLayer.hide();
    }
    (_e = this.structTreeLayer) == null ? void 0 : _e.hide();
    if (!keepCanvasWrapper && __privateGet(this, _canvasWrapper)) {
      __privateSet(this, _canvasWrapper, null);
      __privateMethod(this, _PDFPageView_instances, resetCanvas_fn).call(this);
    }
  }
  toggleEditingMode(isEditing) {
    if (!this.hasEditableAnnotations()) {
      return;
    }
    __privateSet(this, _isEditing2, isEditing);
    this.reset({
      keepAnnotationLayer: true,
      keepAnnotationEditorLayer: true,
      keepXfaLayer: true,
      keepTextLayer: true,
      keepCanvasWrapper: true
    });
  }
  update({
    scale = 0,
    rotation = null,
    optionalContentConfigPromise = null,
    drawingDelay = -1
  }) {
    var _a2;
    this.scale = scale || this.scale;
    if (typeof rotation === "number") {
      this.rotation = rotation;
    }
    if (optionalContentConfigPromise instanceof Promise) {
      this._optionalContentConfigPromise = optionalContentConfigPromise;
      optionalContentConfigPromise.then((optionalContentConfig) => {
        if (optionalContentConfigPromise !== this._optionalContentConfigPromise) {
          return;
        }
        __privateGet(this, _useThumbnailCanvas).initialOptionalContent = optionalContentConfig.hasInitialVisibility;
      });
    }
    __privateGet(this, _useThumbnailCanvas).directDrawing = true;
    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = this.viewport.clone({
      scale: this.scale * PixelsPerInch.PDF_TO_CSS_UNITS,
      rotation: totalRotation
    });
    __privateMethod(this, _PDFPageView_instances, setDimensions_fn).call(this);
    if (this._isStandalone) {
      (_a2 = this._container) == null ? void 0 : _a2.style.setProperty("--scale-factor", this.viewport.scale);
    }
    if (this.canvas) {
      let onlyCssZoom = false;
      if (__privateGet(this, _hasRestrictedScaling)) {
        if (this.maxCanvasPixels === 0) {
          onlyCssZoom = true;
        } else if (this.maxCanvasPixels > 0) {
          const {
            width,
            height
          } = this.viewport;
          const {
            sx,
            sy
          } = this.outputScale;
          onlyCssZoom = (Math.floor(width) * sx | 0) * (Math.floor(height) * sy | 0) > this.maxCanvasPixels;
        }
      }
      const postponeDrawing = drawingDelay >= 0 && drawingDelay < 1e3;
      if (postponeDrawing || onlyCssZoom) {
        if (postponeDrawing && !onlyCssZoom && this.renderingState !== RenderingStates.FINISHED) {
          this.cancelRendering({
            keepAnnotationLayer: true,
            keepAnnotationEditorLayer: true,
            keepXfaLayer: true,
            keepTextLayer: true,
            cancelExtraDelay: drawingDelay
          });
          this.renderingState = RenderingStates.FINISHED;
          __privateGet(this, _useThumbnailCanvas).directDrawing = false;
        }
        this.cssTransform({
          redrawAnnotationLayer: true,
          redrawAnnotationEditorLayer: true,
          redrawXfaLayer: true,
          redrawTextLayer: !postponeDrawing,
          hideTextLayer: postponeDrawing
        });
        if (postponeDrawing) {
          return;
        }
        this.eventBus.dispatch("pagerendered", {
          source: this,
          pageNumber: this.id,
          cssTransform: true,
          timestamp: performance.now(),
          error: __privateGet(this, _renderError)
        });
        return;
      }
    }
    this.cssTransform({});
    this.reset({
      keepAnnotationLayer: true,
      keepAnnotationEditorLayer: true,
      keepXfaLayer: true,
      keepTextLayer: true,
      keepCanvasWrapper: true
    });
  }
  cancelRendering({
    keepAnnotationLayer = false,
    keepAnnotationEditorLayer = false,
    keepXfaLayer = false,
    keepTextLayer = false,
    cancelExtraDelay = 0
  } = {}) {
    var _a2;
    if (this.renderTask) {
      this.renderTask.cancel(cancelExtraDelay);
      this.renderTask = null;
    }
    this.resume = null;
    if (this.textLayer && (!keepTextLayer || !this.textLayer.div)) {
      this.textLayer.cancel();
      this.textLayer = null;
    }
    if (this.annotationLayer && (!keepAnnotationLayer || !this.annotationLayer.div)) {
      this.annotationLayer.cancel();
      this.annotationLayer = null;
      this._annotationCanvasMap = null;
    }
    if (this.structTreeLayer && !this.textLayer) {
      this.structTreeLayer = null;
    }
    if (this.annotationEditorLayer && (!keepAnnotationEditorLayer || !this.annotationEditorLayer.div)) {
      if (this.drawLayer) {
        this.drawLayer.cancel();
        this.drawLayer = null;
      }
      this.annotationEditorLayer.cancel();
      this.annotationEditorLayer = null;
    }
    if (this.xfaLayer && (!keepXfaLayer || !this.xfaLayer.div)) {
      this.xfaLayer.cancel();
      this.xfaLayer = null;
      (_a2 = this._textHighlighter) == null ? void 0 : _a2.disable();
    }
  }
  cssTransform({
    redrawAnnotationLayer = false,
    redrawAnnotationEditorLayer = false,
    redrawXfaLayer = false,
    redrawTextLayer = false,
    hideTextLayer = false
  }) {
    var _a2;
    const {
      canvas
    } = this;
    if (!canvas) {
      return;
    }
    const originalViewport = __privateGet(this, _originalViewport);
    if (this.viewport !== originalViewport) {
      const relativeRotation = (360 + this.viewport.rotation - originalViewport.rotation) % 360;
      if (relativeRotation === 90 || relativeRotation === 270) {
        const {
          width,
          height
        } = this.viewport;
        const scaleX = height / width;
        const scaleY = width / height;
        canvas.style.transform = `rotate(${relativeRotation}deg) scale(${scaleX},${scaleY})`;
      } else {
        canvas.style.transform = relativeRotation === 0 ? "" : `rotate(${relativeRotation}deg)`;
      }
    }
    if (redrawAnnotationLayer && this.annotationLayer) {
      __privateMethod(this, _PDFPageView_instances, renderAnnotationLayer_fn).call(this);
    }
    if (redrawAnnotationEditorLayer && this.annotationEditorLayer) {
      if (this.drawLayer) {
        __privateMethod(this, _PDFPageView_instances, renderDrawLayer_fn).call(this);
      }
      __privateMethod(this, _PDFPageView_instances, renderAnnotationEditorLayer_fn).call(this);
    }
    if (redrawXfaLayer && this.xfaLayer) {
      __privateMethod(this, _PDFPageView_instances, renderXfaLayer_fn).call(this);
    }
    if (this.textLayer) {
      if (hideTextLayer) {
        this.textLayer.hide();
        (_a2 = this.structTreeLayer) == null ? void 0 : _a2.hide();
      } else if (redrawTextLayer) {
        __privateMethod(this, _PDFPageView_instances, renderTextLayer_fn).call(this);
      }
    }
  }
  get width() {
    return this.viewport.width;
  }
  get height() {
    return this.viewport.height;
  }
  getPagePoint(x, y) {
    return this.viewport.convertToPdfPoint(x, y);
  }
  async draw() {
    if (this.renderingState !== RenderingStates.INITIAL) {
      console.error("Must be in new state before drawing");
      this.reset();
    }
    const {
      div,
      l10n,
      pageColors,
      pdfPage,
      viewport
    } = this;
    if (!pdfPage) {
      this.renderingState = RenderingStates.FINISHED;
      throw new Error("pdfPage is not loaded");
    }
    this.renderingState = RenderingStates.RUNNING;
    let canvasWrapper = __privateGet(this, _canvasWrapper);
    if (!canvasWrapper) {
      canvasWrapper = __privateSet(this, _canvasWrapper, document.createElement("div"));
      canvasWrapper.classList.add("canvasWrapper");
      __privateMethod(this, _PDFPageView_instances, addLayer_fn).call(this, canvasWrapper, "canvasWrapper");
    }
    if (!this.textLayer && __privateGet(this, _textLayerMode) !== TextLayerMode.DISABLE && !pdfPage.isPureXfa) {
      this._accessibilityManager || (this._accessibilityManager = new TextAccessibilityManager());
      this.textLayer = new TextLayerBuilder({
        pdfPage,
        highlighter: this._textHighlighter,
        accessibilityManager: this._accessibilityManager,
        enablePermissions: __privateGet(this, _textLayerMode) === TextLayerMode.ENABLE_PERMISSIONS,
        onAppend: (textLayerDiv) => {
          this.l10n.pause();
          __privateMethod(this, _PDFPageView_instances, addLayer_fn).call(this, textLayerDiv, "textLayer");
          this.l10n.resume();
        }
      });
    }
    if (!this.annotationLayer && __privateGet(this, _annotationMode) !== AnnotationMode.DISABLE) {
      const {
        annotationStorage,
        annotationEditorUIManager,
        downloadManager,
        enableScripting,
        fieldObjectsPromise,
        hasJSActionsPromise,
        linkService
      } = __privateGet(this, _layerProperties);
      this._annotationCanvasMap || (this._annotationCanvasMap = /* @__PURE__ */ new Map());
      this.annotationLayer = new AnnotationLayerBuilder({
        pdfPage,
        annotationStorage,
        imageResourcesPath: this.imageResourcesPath,
        renderForms: __privateGet(this, _annotationMode) === AnnotationMode.ENABLE_FORMS,
        linkService,
        downloadManager,
        enableScripting,
        hasJSActionsPromise,
        fieldObjectsPromise,
        annotationCanvasMap: this._annotationCanvasMap,
        accessibilityManager: this._accessibilityManager,
        annotationEditorUIManager,
        onAppend: (annotationLayerDiv) => {
          __privateMethod(this, _PDFPageView_instances, addLayer_fn).call(this, annotationLayerDiv, "annotationLayer");
        }
      });
    }
    const renderContinueCallback = (cont) => {
      showCanvas == null ? void 0 : showCanvas(false);
      if (this.renderingQueue && !this.renderingQueue.isHighestPriority(this)) {
        this.renderingState = RenderingStates.PAUSED;
        this.resume = () => {
          this.renderingState = RenderingStates.RUNNING;
          cont();
        };
        return;
      }
      cont();
    };
    const {
      width,
      height
    } = viewport;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("role", "presentation");
    const hasHCM = !!((pageColors == null ? void 0 : pageColors.background) && (pageColors == null ? void 0 : pageColors.foreground));
    const prevCanvas = this.canvas;
    const updateOnFirstShow = !prevCanvas && !hasHCM;
    this.canvas = canvas;
    __privateSet(this, _originalViewport, viewport);
    let showCanvas = (isLastShow) => {
      if (updateOnFirstShow) {
        canvasWrapper.prepend(canvas);
        showCanvas = null;
        return;
      }
      if (!isLastShow) {
        return;
      }
      if (prevCanvas) {
        prevCanvas.replaceWith(canvas);
        prevCanvas.width = prevCanvas.height = 0;
      } else {
        canvasWrapper.prepend(canvas);
      }
      showCanvas = null;
    };
    const ctx = canvas.getContext("2d", {
      alpha: false,
      willReadFrequently: !__privateGet(this, _enableHWA)
    });
    const outputScale = this.outputScale = new OutputScale();
    if (this.maxCanvasPixels === 0) {
      const invScale = 1 / this.scale;
      outputScale.sx *= invScale;
      outputScale.sy *= invScale;
      __privateSet(this, _hasRestrictedScaling, true);
    } else if (this.maxCanvasPixels > 0) {
      const pixelsInViewport = width * height;
      const maxScale = Math.sqrt(this.maxCanvasPixels / pixelsInViewport);
      if (outputScale.sx > maxScale || outputScale.sy > maxScale) {
        outputScale.sx = maxScale;
        outputScale.sy = maxScale;
        __privateSet(this, _hasRestrictedScaling, true);
      } else {
        __privateSet(this, _hasRestrictedScaling, false);
      }
    }
    const sfx = approximateFraction(outputScale.sx);
    const sfy = approximateFraction(outputScale.sy);
    const canvasWidth = canvas.width = floorToDivide(calcRound(width * outputScale.sx), sfx[0]);
    const canvasHeight = canvas.height = floorToDivide(calcRound(height * outputScale.sy), sfy[0]);
    const pageWidth = floorToDivide(calcRound(width), sfx[1]);
    const pageHeight = floorToDivide(calcRound(height), sfy[1]);
    outputScale.sx = canvasWidth / pageWidth;
    outputScale.sy = canvasHeight / pageHeight;
    if (__privateGet(this, _scaleRoundX) !== sfx[1]) {
      div.style.setProperty("--scale-round-x", `${sfx[1]}px`);
      __privateSet(this, _scaleRoundX, sfx[1]);
    }
    if (__privateGet(this, _scaleRoundY) !== sfy[1]) {
      div.style.setProperty("--scale-round-y", `${sfy[1]}px`);
      __privateSet(this, _scaleRoundY, sfy[1]);
    }
    const transform = outputScale.scaled ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0] : null;
    const renderContext = {
      canvasContext: ctx,
      transform,
      viewport,
      annotationMode: __privateGet(this, _annotationMode),
      optionalContentConfigPromise: this._optionalContentConfigPromise,
      annotationCanvasMap: this._annotationCanvasMap,
      pageColors,
      isEditing: __privateGet(this, _isEditing2)
    };
    const renderTask = this.renderTask = pdfPage.render(renderContext);
    renderTask.onContinue = renderContinueCallback;
    const resultPromise = renderTask.promise.then(async () => {
      var _a2;
      showCanvas == null ? void 0 : showCanvas(true);
      await __privateMethod(this, _PDFPageView_instances, finishRenderTask_fn2).call(this, renderTask);
      this.structTreeLayer || (this.structTreeLayer = new StructTreeLayerBuilder(pdfPage, viewport.rawDims));
      __privateMethod(this, _PDFPageView_instances, renderTextLayer_fn).call(this);
      if (this.annotationLayer) {
        await __privateMethod(this, _PDFPageView_instances, renderAnnotationLayer_fn).call(this);
      }
      const {
        annotationEditorUIManager
      } = __privateGet(this, _layerProperties);
      if (!annotationEditorUIManager) {
        return;
      }
      this.drawLayer || (this.drawLayer = new DrawLayerBuilder({
        pageIndex: this.id
      }));
      await __privateMethod(this, _PDFPageView_instances, renderDrawLayer_fn).call(this);
      this.drawLayer.setParent(canvasWrapper);
      this.annotationEditorLayer || (this.annotationEditorLayer = new AnnotationEditorLayerBuilder({
        uiManager: annotationEditorUIManager,
        pdfPage,
        l10n,
        structTreeLayer: this.structTreeLayer,
        accessibilityManager: this._accessibilityManager,
        annotationLayer: (_a2 = this.annotationLayer) == null ? void 0 : _a2.annotationLayer,
        textLayer: this.textLayer,
        drawLayer: this.drawLayer.getDrawLayer(),
        onAppend: (annotationEditorLayerDiv) => {
          __privateMethod(this, _PDFPageView_instances, addLayer_fn).call(this, annotationEditorLayerDiv, "annotationEditorLayer");
        }
      }));
      __privateMethod(this, _PDFPageView_instances, renderAnnotationEditorLayer_fn).call(this);
    }, (error) => {
      if (!(error instanceof RenderingCancelledException)) {
        showCanvas == null ? void 0 : showCanvas(true);
      } else {
        prevCanvas == null ? void 0 : prevCanvas.remove();
        __privateMethod(this, _PDFPageView_instances, resetCanvas_fn).call(this);
      }
      return __privateMethod(this, _PDFPageView_instances, finishRenderTask_fn2).call(this, renderTask, error);
    });
    if (pdfPage.isPureXfa) {
      if (!this.xfaLayer) {
        const {
          annotationStorage,
          linkService
        } = __privateGet(this, _layerProperties);
        this.xfaLayer = new XfaLayerBuilder({
          pdfPage,
          annotationStorage,
          linkService
        });
      }
      __privateMethod(this, _PDFPageView_instances, renderXfaLayer_fn).call(this);
    }
    div.setAttribute("data-loaded", true);
    this.eventBus.dispatch("pagerender", {
      source: this,
      pageNumber: this.id
    });
    return resultPromise;
  }
  setPageLabel(label) {
    var _a2;
    this.pageLabel = typeof label === "string" ? label : null;
    this.div.setAttribute("data-l10n-args", JSON.stringify({
      page: (_a2 = this.pageLabel) != null ? _a2 : this.id
    }));
    if (this.pageLabel !== null) {
      this.div.setAttribute("data-page-label", this.pageLabel);
    } else {
      this.div.removeAttribute("data-page-label");
    }
  }
  get thumbnailCanvas() {
    const {
      directDrawing,
      initialOptionalContent,
      regularAnnotations
    } = __privateGet(this, _useThumbnailCanvas);
    return directDrawing && initialOptionalContent && regularAnnotations ? this.canvas : null;
  }
}
_annotationMode = new WeakMap();
_canvasWrapper = new WeakMap();
_enableHWA = new WeakMap();
_hasRestrictedScaling = new WeakMap();
_isEditing2 = new WeakMap();
_layerProperties = new WeakMap();
_loadingId = new WeakMap();
_originalViewport = new WeakMap();
_previousRotation = new WeakMap();
_scaleRoundX = new WeakMap();
_scaleRoundY = new WeakMap();
_renderError = new WeakMap();
_renderingState = new WeakMap();
_textLayerMode = new WeakMap();
_useThumbnailCanvas = new WeakMap();
_layers = new WeakMap();
_PDFPageView_instances = new WeakSet();
addLayer_fn = function(div, name) {
  const pos = LAYERS_ORDER.get(name);
  const oldDiv = __privateGet(this, _layers)[pos];
  __privateGet(this, _layers)[pos] = div;
  if (oldDiv) {
    oldDiv.replaceWith(div);
    return;
  }
  for (let i = pos - 1; i >= 0; i--) {
    const layer = __privateGet(this, _layers)[i];
    if (layer) {
      layer.after(div);
      return;
    }
  }
  this.div.prepend(div);
};
setDimensions_fn = function() {
  const {
    viewport
  } = this;
  if (this.pdfPage) {
    if (__privateGet(this, _previousRotation) === viewport.rotation) {
      return;
    }
    __privateSet(this, _previousRotation, viewport.rotation);
  }
  setLayerDimensions(this.div, viewport, true, false);
};
dispatchLayerRendered_fn = function(name, error) {
  this.eventBus.dispatch(name, {
    source: this,
    pageNumber: this.id,
    error
  });
};
renderAnnotationLayer_fn = async function() {
  let error = null;
  try {
    await this.annotationLayer.render(this.viewport, {
      structTreeLayer: this.structTreeLayer
    }, "display");
  } catch (ex) {
    console.error("#renderAnnotationLayer:", ex);
    error = ex;
  } finally {
    __privateMethod(this, _PDFPageView_instances, dispatchLayerRendered_fn).call(this, "annotationlayerrendered", error);
  }
};
renderAnnotationEditorLayer_fn = async function() {
  let error = null;
  try {
    await this.annotationEditorLayer.render(this.viewport, "display");
  } catch (ex) {
    console.error("#renderAnnotationEditorLayer:", ex);
    error = ex;
  } finally {
    __privateMethod(this, _PDFPageView_instances, dispatchLayerRendered_fn).call(this, "annotationeditorlayerrendered", error);
  }
};
renderDrawLayer_fn = async function() {
  try {
    await this.drawLayer.render("display");
  } catch (ex) {
    console.error("#renderDrawLayer:", ex);
  }
};
renderXfaLayer_fn = async function() {
  var _a2;
  let error = null;
  try {
    const result = await this.xfaLayer.render(this.viewport, "display");
    if ((result == null ? void 0 : result.textDivs) && this._textHighlighter) {
      __privateMethod(this, _PDFPageView_instances, buildXfaTextContentItems_fn).call(this, result.textDivs);
    }
  } catch (ex) {
    console.error("#renderXfaLayer:", ex);
    error = ex;
  } finally {
    if ((_a2 = this.xfaLayer) == null ? void 0 : _a2.div) {
      this.l10n.pause();
      __privateMethod(this, _PDFPageView_instances, addLayer_fn).call(this, this.xfaLayer.div, "xfaLayer");
      this.l10n.resume();
    }
    __privateMethod(this, _PDFPageView_instances, dispatchLayerRendered_fn).call(this, "xfalayerrendered", error);
  }
};
renderTextLayer_fn = async function() {
  if (!this.textLayer) {
    return;
  }
  let error = null;
  try {
    await this.textLayer.render(this.viewport);
  } catch (ex) {
    if (ex instanceof AbortException) {
      return;
    }
    console.error("#renderTextLayer:", ex);
    error = ex;
  }
  __privateMethod(this, _PDFPageView_instances, dispatchLayerRendered_fn).call(this, "textlayerrendered", error);
  __privateMethod(this, _PDFPageView_instances, renderStructTreeLayer_fn).call(this);
};
renderStructTreeLayer_fn = async function() {
  var _a2, _b, _c;
  if (!this.textLayer) {
    return;
  }
  const treeDom = await ((_a2 = this.structTreeLayer) == null ? void 0 : _a2.render());
  if (treeDom) {
    this.l10n.pause();
    (_b = this.structTreeLayer) == null ? void 0 : _b.addElementsToTextLayer();
    if (this.canvas && treeDom.parentNode !== this.canvas) {
      this.canvas.append(treeDom);
    }
    this.l10n.resume();
  }
  (_c = this.structTreeLayer) == null ? void 0 : _c.show();
};
buildXfaTextContentItems_fn = async function(textDivs) {
  const text = await this.pdfPage.getTextContent();
  const items = [];
  for (const item of text.items) {
    items.push(item.str);
  }
  this._textHighlighter.setTextMapping(textDivs, items);
  this._textHighlighter.enable();
};
resetCanvas_fn = function() {
  const {
    canvas
  } = this;
  if (!canvas) {
    return;
  }
  canvas.remove();
  canvas.width = canvas.height = 0;
  this.canvas = null;
  __privateSet(this, _originalViewport, null);
};
finishRenderTask_fn2 = async function(renderTask, error = null) {
  if (renderTask === this.renderTask) {
    this.renderTask = null;
  }
  if (error instanceof RenderingCancelledException) {
    __privateSet(this, _renderError, null);
    return;
  }
  __privateSet(this, _renderError, error);
  this.renderingState = RenderingStates.FINISHED;
  __privateGet(this, _useThumbnailCanvas).regularAnnotations = !renderTask.separateAnnots;
  this.eventBus.dispatch("pagerendered", {
    source: this,
    pageNumber: this.id,
    cssTransform: false,
    timestamp: performance.now(),
    error: __privateGet(this, _renderError)
  });
  if (error) {
    throw error;
  }
};
;
const DEFAULT_CACHE_SIZE = 10;
const PagesCountLimit = {
  FORCE_SCROLL_MODE_PAGE: 1e4,
  FORCE_LAZY_PAGE_INIT: 5e3,
  PAUSE_EAGER_PAGE_INIT: 250
};
function isValidAnnotationEditorMode(mode) {
  return Object.values(AnnotationEditorType).includes(mode) && mode !== AnnotationEditorType.DISABLE;
}
class PDFPageViewBuffer {
  constructor(size) {
    __privateAdd(this, _PDFPageViewBuffer_instances);
    __privateAdd(this, _buf, /* @__PURE__ */ new Set());
    __privateAdd(this, _size, 0);
    __privateSet(this, _size, size);
  }
  push(view) {
    const buf = __privateGet(this, _buf);
    if (buf.has(view)) {
      buf.delete(view);
    }
    buf.add(view);
    if (buf.size > __privateGet(this, _size)) {
      __privateMethod(this, _PDFPageViewBuffer_instances, destroyFirstView_fn).call(this);
    }
  }
  resize(newSize, idsToKeep = null) {
    __privateSet(this, _size, newSize);
    const buf = __privateGet(this, _buf);
    if (idsToKeep) {
      const ii = buf.size;
      let i = 1;
      for (const view of buf) {
        if (idsToKeep.has(view.id)) {
          buf.delete(view);
          buf.add(view);
        }
        if (++i > ii) {
          break;
        }
      }
    }
    while (buf.size > __privateGet(this, _size)) {
      __privateMethod(this, _PDFPageViewBuffer_instances, destroyFirstView_fn).call(this);
    }
  }
  has(view) {
    return __privateGet(this, _buf).has(view);
  }
  [Symbol.iterator]() {
    return __privateGet(this, _buf).keys();
  }
}
_buf = new WeakMap();
_size = new WeakMap();
_PDFPageViewBuffer_instances = new WeakSet();
destroyFirstView_fn = function() {
  const firstView = __privateGet(this, _buf).keys().next().value;
  firstView == null ? void 0 : firstView.destroy();
  __privateGet(this, _buf).delete(firstView);
};
class PDFViewer {
  constructor(options) {
    __privateAdd(this, _PDFViewer_instances);
    __privateAdd(this, _buffer, null);
    __privateAdd(this, _altTextManager, null);
    __privateAdd(this, _annotationEditorHighlightColors, null);
    __privateAdd(this, _annotationEditorMode, AnnotationEditorType.NONE);
    __privateAdd(this, _annotationEditorUIManager, null);
    __privateAdd(this, _annotationMode2, AnnotationMode.ENABLE_FORMS);
    __privateAdd(this, _containerTopLeft, null);
    __privateAdd(this, _editorUndoBar, null);
    __privateAdd(this, _enableHWA2, false);
    __privateAdd(this, _enableHighlightFloatingButton, false);
    __privateAdd(this, _enablePermissions2, false);
    __privateAdd(this, _enableUpdatedAddImage, false);
    __privateAdd(this, _enableNewAltTextWhenAddingImage, false);
    __privateAdd(this, _eventAbortController5, null);
    __privateAdd(this, _mlManager2, null);
    __privateAdd(this, _switchAnnotationEditorModeAC, null);
    __privateAdd(this, _switchAnnotationEditorModeTimeoutId, null);
    __privateAdd(this, _getAllTextInProgress, false);
    __privateAdd(this, _hiddenCopyElement, null);
    __privateAdd(this, _interruptCopyCondition, false);
    __privateAdd(this, _previousContainerHeight, 0);
    __privateAdd(this, _resizeObserver2, new ResizeObserver(__privateMethod(this, _PDFViewer_instances, resizeObserverCallback_fn2).bind(this)));
    __privateAdd(this, _scrollModePageState, null);
    __privateAdd(this, _scaleTimeoutId, null);
    __privateAdd(this, _supportsPinchToZoom, true);
    __privateAdd(this, _textLayerMode2, TextLayerMode.ENABLE);
    var _a2, _b, _c, _d, _e;
    const viewerVersion = "4.10.38";
    if (version !== viewerVersion) {
      throw new Error(`The API version "${version}" does not match the Viewer version "${viewerVersion}".`);
    }
    this.container = options.container;
    this.viewer = options.viewer || options.container.firstElementChild;
    if (((_a2 = this.container) == null ? void 0 : _a2.tagName) !== "DIV" || ((_b = this.viewer) == null ? void 0 : _b.tagName) !== "DIV") {
      throw new Error("Invalid `container` and/or `viewer` option.");
    }
    if (this.container.offsetParent && getComputedStyle(this.container).position !== "absolute") {
      throw new Error("The `container` must be absolutely positioned.");
    }
    __privateGet(this, _resizeObserver2).observe(this.container);
    this.eventBus = options.eventBus;
    this.linkService = options.linkService || new SimpleLinkService();
    this.downloadManager = options.downloadManager || null;
    this.findController = options.findController || null;
    __privateSet(this, _altTextManager, options.altTextManager || null);
    __privateSet(this, _editorUndoBar, options.editorUndoBar || null);
    if (this.findController) {
      this.findController.onIsPageVisible = (pageNumber) => this._getVisiblePages().ids.has(pageNumber);
    }
    this._scriptingManager = options.scriptingManager || null;
    __privateSet(this, _textLayerMode2, (_c = options.textLayerMode) != null ? _c : TextLayerMode.ENABLE);
    __privateSet(this, _annotationMode2, (_d = options.annotationMode) != null ? _d : AnnotationMode.ENABLE_FORMS);
    __privateSet(this, _annotationEditorMode, (_e = options.annotationEditorMode) != null ? _e : AnnotationEditorType.NONE);
    __privateSet(this, _annotationEditorHighlightColors, options.annotationEditorHighlightColors || null);
    __privateSet(this, _enableHighlightFloatingButton, options.enableHighlightFloatingButton === true);
    __privateSet(this, _enableUpdatedAddImage, options.enableUpdatedAddImage === true);
    __privateSet(this, _enableNewAltTextWhenAddingImage, options.enableNewAltTextWhenAddingImage === true);
    this.imageResourcesPath = options.imageResourcesPath || "";
    this.enablePrintAutoRotate = options.enablePrintAutoRotate || false;
    this.removePageBorders = options.removePageBorders || false;
    this.maxCanvasPixels = options.maxCanvasPixels;
    this.l10n = options.l10n;
    this.l10n || (this.l10n = new genericl10n_GenericL10n());
    __privateSet(this, _enablePermissions2, options.enablePermissions || false);
    this.pageColors = options.pageColors || null;
    __privateSet(this, _mlManager2, options.mlManager || null);
    __privateSet(this, _enableHWA2, options.enableHWA || false);
    __privateSet(this, _supportsPinchToZoom, options.supportsPinchToZoom !== false);
    this.defaultRenderingQueue = !options.renderingQueue;
    if (this.defaultRenderingQueue) {
      this.renderingQueue = new PDFRenderingQueue();
      this.renderingQueue.setViewer(this);
    } else {
      this.renderingQueue = options.renderingQueue;
    }
    const {
      abortSignal
    } = options;
    abortSignal == null ? void 0 : abortSignal.addEventListener("abort", () => {
      __privateGet(this, _resizeObserver2).disconnect();
      __privateSet(this, _resizeObserver2, null);
    }, {
      once: true
    });
    this.scroll = watchScroll(this.container, this._scrollUpdate.bind(this), abortSignal);
    this.presentationModeState = PresentationModeState.UNKNOWN;
    this._resetView();
    if (this.removePageBorders) {
      this.viewer.classList.add("removePageBorders");
    }
    __privateMethod(this, _PDFViewer_instances, updateContainerHeightCss_fn).call(this);
    this.eventBus._on("thumbnailrendered", ({
      pageNumber,
      pdfPage
    }) => {
      const pageView = this._pages[pageNumber - 1];
      if (!__privateGet(this, _buffer).has(pageView)) {
        pdfPage == null ? void 0 : pdfPage.cleanup();
      }
    });
    if (!options.l10n) {
      this.l10n.translate(this.container);
    }
  }
  get pagesCount() {
    return this._pages.length;
  }
  getPageView(index) {
    return this._pages[index];
  }
  getCachedPageViews() {
    return new Set(__privateGet(this, _buffer));
  }
  get pageViewsReady() {
    return this._pages.every((pageView) => pageView == null ? void 0 : pageView.pdfPage);
  }
  get renderForms() {
    return __privateGet(this, _annotationMode2) === AnnotationMode.ENABLE_FORMS;
  }
  get enableScripting() {
    return !!this._scriptingManager;
  }
  get currentPageNumber() {
    return this._currentPageNumber;
  }
  set currentPageNumber(val) {
    if (!Number.isInteger(val)) {
      throw new Error("Invalid page number.");
    }
    if (!this.pdfDocument) {
      return;
    }
    if (!this._setCurrentPageNumber(val, true)) {
      console.error(`currentPageNumber: "${val}" is not a valid page.`);
    }
  }
  _setCurrentPageNumber(val, resetCurrentPageView = false) {
    var _a2, _b;
    if (this._currentPageNumber === val) {
      if (resetCurrentPageView) {
        __privateMethod(this, _PDFViewer_instances, resetCurrentPageView_fn).call(this);
      }
      return true;
    }
    if (!(0 < val && val <= this.pagesCount)) {
      return false;
    }
    const previous = this._currentPageNumber;
    this._currentPageNumber = val;
    this.eventBus.dispatch("pagechanging", {
      source: this,
      pageNumber: val,
      pageLabel: (_b = (_a2 = this._pageLabels) == null ? void 0 : _a2[val - 1]) != null ? _b : null,
      previous
    });
    if (resetCurrentPageView) {
      __privateMethod(this, _PDFViewer_instances, resetCurrentPageView_fn).call(this);
    }
    return true;
  }
  get currentPageLabel() {
    var _a2, _b;
    return (_b = (_a2 = this._pageLabels) == null ? void 0 : _a2[this._currentPageNumber - 1]) != null ? _b : null;
  }
  set currentPageLabel(val) {
    if (!this.pdfDocument) {
      return;
    }
    let page = val | 0;
    if (this._pageLabels) {
      const i = this._pageLabels.indexOf(val);
      if (i >= 0) {
        page = i + 1;
      }
    }
    if (!this._setCurrentPageNumber(page, true)) {
      console.error(`currentPageLabel: "${val}" is not a valid page.`);
    }
  }
  get currentScale() {
    return this._currentScale !== UNKNOWN_SCALE ? this._currentScale : DEFAULT_SCALE;
  }
  set currentScale(val) {
    if (isNaN(val)) {
      throw new Error("Invalid numeric scale.");
    }
    if (!this.pdfDocument) {
      return;
    }
    __privateMethod(this, _PDFViewer_instances, setScale_fn).call(this, val, {
      noScroll: false
    });
  }
  get currentScaleValue() {
    return this._currentScaleValue;
  }
  set currentScaleValue(val) {
    if (!this.pdfDocument) {
      return;
    }
    __privateMethod(this, _PDFViewer_instances, setScale_fn).call(this, val, {
      noScroll: false
    });
  }
  get pagesRotation() {
    return this._pagesRotation;
  }
  set pagesRotation(rotation) {
    if (!isValidRotation(rotation)) {
      throw new Error("Invalid pages rotation angle.");
    }
    if (!this.pdfDocument) {
      return;
    }
    rotation %= 360;
    if (rotation < 0) {
      rotation += 360;
    }
    if (this._pagesRotation === rotation) {
      return;
    }
    this._pagesRotation = rotation;
    const pageNumber = this._currentPageNumber;
    this.refresh(true, {
      rotation
    });
    if (this._currentScaleValue) {
      __privateMethod(this, _PDFViewer_instances, setScale_fn).call(this, this._currentScaleValue, {
        noScroll: true
      });
    }
    this.eventBus.dispatch("rotationchanging", {
      source: this,
      pagesRotation: rotation,
      pageNumber
    });
    if (this.defaultRenderingQueue) {
      this.update();
    }
  }
  get firstPagePromise() {
    return this.pdfDocument ? this._firstPageCapability.promise : null;
  }
  get onePageRendered() {
    return this.pdfDocument ? this._onePageRenderedCapability.promise : null;
  }
  get pagesPromise() {
    return this.pdfDocument ? this._pagesCapability.promise : null;
  }
  get _layerProperties() {
    const self = this;
    return shadow(this, "_layerProperties", {
      get annotationEditorUIManager() {
        return __privateGet(self, _annotationEditorUIManager);
      },
      get annotationStorage() {
        var _a2;
        return (_a2 = self.pdfDocument) == null ? void 0 : _a2.annotationStorage;
      },
      get downloadManager() {
        return self.downloadManager;
      },
      get enableScripting() {
        return !!self._scriptingManager;
      },
      get fieldObjectsPromise() {
        var _a2;
        return (_a2 = self.pdfDocument) == null ? void 0 : _a2.getFieldObjects();
      },
      get findController() {
        return self.findController;
      },
      get hasJSActionsPromise() {
        var _a2;
        return (_a2 = self.pdfDocument) == null ? void 0 : _a2.hasJSActions();
      },
      get linkService() {
        return self.linkService;
      }
    });
  }
  async getAllText() {
    const texts = [];
    const buffer = [];
    for (let pageNum = 1, pagesCount = this.pdfDocument.numPages; pageNum <= pagesCount; ++pageNum) {
      if (__privateGet(this, _interruptCopyCondition)) {
        return null;
      }
      buffer.length = 0;
      const page = await this.pdfDocument.getPage(pageNum);
      const {
        items
      } = await page.getTextContent();
      for (const item of items) {
        if (item.str) {
          buffer.push(item.str);
        }
        if (item.hasEOL) {
          buffer.push("\n");
        }
      }
      texts.push(removeNullCharacters(buffer.join("")));
    }
    return texts.join("\n");
  }
  setDocument(pdfDocument) {
    var _a2, _b, _c;
    if (this.pdfDocument) {
      this.eventBus.dispatch("pagesdestroy", {
        source: this
      });
      this._cancelRendering();
      this._resetView();
      (_a2 = this.findController) == null ? void 0 : _a2.setDocument(null);
      (_b = this._scriptingManager) == null ? void 0 : _b.setDocument(null);
      (_c = __privateGet(this, _annotationEditorUIManager)) == null ? void 0 : _c.destroy();
      __privateSet(this, _annotationEditorUIManager, null);
    }
    this.pdfDocument = pdfDocument;
    if (!pdfDocument) {
      return;
    }
    const pagesCount = pdfDocument.numPages;
    const firstPagePromise = pdfDocument.getPage(1);
    const optionalContentConfigPromise = pdfDocument.getOptionalContentConfig({
      intent: "display"
    });
    const permissionsPromise = __privateGet(this, _enablePermissions2) ? pdfDocument.getPermissions() : Promise.resolve();
    const {
      eventBus,
      pageColors,
      viewer
    } = this;
    __privateSet(this, _eventAbortController5, new AbortController());
    const {
      signal
    } = __privateGet(this, _eventAbortController5);
    if (pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE) {
      console.warn("Forcing PAGE-scrolling for performance reasons, given the length of the document.");
      const mode = this._scrollMode = ScrollMode.PAGE;
      eventBus.dispatch("scrollmodechanged", {
        source: this,
        mode
      });
    }
    this._pagesCapability.promise.then(() => {
      eventBus.dispatch("pagesloaded", {
        source: this,
        pagesCount
      });
    }, () => {
    });
    const onBeforeDraw = (evt) => {
      const pageView = this._pages[evt.pageNumber - 1];
      if (!pageView) {
        return;
      }
      __privateGet(this, _buffer).push(pageView);
    };
    eventBus._on("pagerender", onBeforeDraw, {
      signal
    });
    const onAfterDraw = (evt) => {
      if (evt.cssTransform) {
        return;
      }
      this._onePageRenderedCapability.resolve({
        timestamp: evt.timestamp
      });
      eventBus._off("pagerendered", onAfterDraw);
    };
    eventBus._on("pagerendered", onAfterDraw, {
      signal
    });
    Promise.all([firstPagePromise, permissionsPromise]).then(([firstPdfPage, permissions]) => {
      var _a3, _b2;
      if (pdfDocument !== this.pdfDocument) {
        return;
      }
      this._firstPageCapability.resolve(firstPdfPage);
      this._optionalContentConfigPromise = optionalContentConfigPromise;
      const {
        annotationEditorMode,
        annotationMode,
        textLayerMode
      } = __privateMethod(this, _PDFViewer_instances, initializePermissions_fn).call(this, permissions);
      if (textLayerMode !== TextLayerMode.DISABLE) {
        const element = __privateSet(this, _hiddenCopyElement, document.createElement("div"));
        element.id = "hiddenCopyElement";
        viewer.before(element);
      }
      if (typeof AbortSignal.any === "function" && annotationEditorMode !== AnnotationEditorType.DISABLE) {
        const mode = annotationEditorMode;
        if (pdfDocument.isPureXfa) {
          console.warn("Warning: XFA-editing is not implemented.");
        } else if (isValidAnnotationEditorMode(mode)) {
          __privateSet(this, _annotationEditorUIManager, new AnnotationEditorUIManager(this.container, viewer, __privateGet(this, _altTextManager), eventBus, pdfDocument, pageColors, __privateGet(this, _annotationEditorHighlightColors), __privateGet(this, _enableHighlightFloatingButton), __privateGet(this, _enableUpdatedAddImage), __privateGet(this, _enableNewAltTextWhenAddingImage), __privateGet(this, _mlManager2), __privateGet(this, _editorUndoBar), __privateGet(this, _supportsPinchToZoom)));
          eventBus.dispatch("annotationeditoruimanager", {
            source: this,
            uiManager: __privateGet(this, _annotationEditorUIManager)
          });
          if (mode !== AnnotationEditorType.NONE) {
            if (mode === AnnotationEditorType.STAMP) {
              (_a3 = __privateGet(this, _mlManager2)) == null ? void 0 : _a3.loadModel("altText");
            }
            __privateGet(this, _annotationEditorUIManager).updateMode(mode);
          }
        } else {
          console.error(`Invalid AnnotationEditor mode: ${mode}`);
        }
      }
      const viewerElement = this._scrollMode === ScrollMode.PAGE ? null : viewer;
      const scale = this.currentScale;
      const viewport = firstPdfPage.getViewport({
        scale: scale * PixelsPerInch.PDF_TO_CSS_UNITS
      });
      viewer.style.setProperty("--scale-factor", viewport.scale);
      if (pageColors == null ? void 0 : pageColors.background) {
        viewer.style.setProperty("--page-bg-color", pageColors.background);
      }
      if ((pageColors == null ? void 0 : pageColors.foreground) === "CanvasText" || (pageColors == null ? void 0 : pageColors.background) === "Canvas") {
        viewer.style.setProperty("--hcm-highlight-filter", pdfDocument.filterFactory.addHighlightHCMFilter("highlight", "CanvasText", "Canvas", "HighlightText", "Highlight"));
        viewer.style.setProperty("--hcm-highlight-selected-filter", pdfDocument.filterFactory.addHighlightHCMFilter("highlight_selected", "CanvasText", "Canvas", "HighlightText", "ButtonText"));
      }
      for (let pageNum = 1; pageNum <= pagesCount; ++pageNum) {
        const pageView = new PDFPageView({
          container: viewerElement,
          eventBus,
          id: pageNum,
          scale,
          defaultViewport: viewport.clone(),
          optionalContentConfigPromise,
          renderingQueue: this.renderingQueue,
          textLayerMode,
          annotationMode,
          imageResourcesPath: this.imageResourcesPath,
          maxCanvasPixels: this.maxCanvasPixels,
          pageColors,
          l10n: this.l10n,
          layerProperties: this._layerProperties,
          enableHWA: __privateGet(this, _enableHWA2)
        });
        this._pages.push(pageView);
      }
      (_b2 = this._pages[0]) == null ? void 0 : _b2.setPdfPage(firstPdfPage);
      if (this._scrollMode === ScrollMode.PAGE) {
        __privateMethod(this, _PDFViewer_instances, ensurePageViewVisible_fn).call(this);
      } else if (this._spreadMode !== SpreadMode.NONE) {
        this._updateSpreadMode();
      }
      __privateMethod(this, _PDFViewer_instances, onePageRenderedOrForceFetch_fn).call(this, signal).then(async () => {
        var _a4, _b3;
        if (pdfDocument !== this.pdfDocument) {
          return;
        }
        (_a4 = this.findController) == null ? void 0 : _a4.setDocument(pdfDocument);
        (_b3 = this._scriptingManager) == null ? void 0 : _b3.setDocument(pdfDocument);
        if (__privateGet(this, _hiddenCopyElement)) {
          document.addEventListener("copy", __privateMethod(this, _PDFViewer_instances, copyCallback_fn).bind(this, textLayerMode), {
            signal
          });
        }
        if (__privateGet(this, _annotationEditorUIManager)) {
          eventBus.dispatch("annotationeditormodechanged", {
            source: this,
            mode: __privateGet(this, _annotationEditorMode)
          });
        }
        if (pdfDocument.loadingParams.disableAutoFetch || pagesCount > PagesCountLimit.FORCE_LAZY_PAGE_INIT) {
          this._pagesCapability.resolve();
          return;
        }
        let getPagesLeft = pagesCount - 1;
        if (getPagesLeft <= 0) {
          this._pagesCapability.resolve();
          return;
        }
        for (let pageNum = 2; pageNum <= pagesCount; ++pageNum) {
          const promise = pdfDocument.getPage(pageNum).then((pdfPage) => {
            const pageView = this._pages[pageNum - 1];
            if (!pageView.pdfPage) {
              pageView.setPdfPage(pdfPage);
            }
            if (--getPagesLeft === 0) {
              this._pagesCapability.resolve();
            }
          }, (reason) => {
            console.error(`Unable to get page ${pageNum} to initialize viewer`, reason);
            if (--getPagesLeft === 0) {
              this._pagesCapability.resolve();
            }
          });
          if (pageNum % PagesCountLimit.PAUSE_EAGER_PAGE_INIT === 0) {
            await promise;
          }
        }
      });
      eventBus.dispatch("pagesinit", {
        source: this
      });
      pdfDocument.getMetadata().then(({
        info
      }) => {
        if (pdfDocument !== this.pdfDocument) {
          return;
        }
        if (info.Language) {
          viewer.lang = info.Language;
        }
      });
      if (this.defaultRenderingQueue) {
        this.update();
      }
    }).catch((reason) => {
      console.error("Unable to initialize viewer", reason);
      this._pagesCapability.reject(reason);
    });
  }
  setPageLabels(labels) {
    var _a2, _b;
    if (!this.pdfDocument) {
      return;
    }
    if (!labels) {
      this._pageLabels = null;
    } else if (!(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)) {
      this._pageLabels = null;
      console.error(`setPageLabels: Invalid page labels.`);
    } else {
      this._pageLabels = labels;
    }
    for (let i = 0, ii = this._pages.length; i < ii; i++) {
      this._pages[i].setPageLabel((_b = (_a2 = this._pageLabels) == null ? void 0 : _a2[i]) != null ? _b : null);
    }
  }
  _resetView() {
    var _a2, _b;
    this._pages = [];
    this._currentPageNumber = 1;
    this._currentScale = UNKNOWN_SCALE;
    this._currentScaleValue = null;
    this._pageLabels = null;
    __privateSet(this, _buffer, new PDFPageViewBuffer(DEFAULT_CACHE_SIZE));
    this._location = null;
    this._pagesRotation = 0;
    this._optionalContentConfigPromise = null;
    this._firstPageCapability = Promise.withResolvers();
    this._onePageRenderedCapability = Promise.withResolvers();
    this._pagesCapability = Promise.withResolvers();
    this._scrollMode = ScrollMode.VERTICAL;
    this._previousScrollMode = ScrollMode.UNKNOWN;
    this._spreadMode = SpreadMode.NONE;
    __privateSet(this, _scrollModePageState, {
      previousPageNumber: 1,
      scrollDown: true,
      pages: []
    });
    (_a2 = __privateGet(this, _eventAbortController5)) == null ? void 0 : _a2.abort();
    __privateSet(this, _eventAbortController5, null);
    this.viewer.textContent = "";
    this._updateScrollMode();
    this.viewer.removeAttribute("lang");
    (_b = __privateGet(this, _hiddenCopyElement)) == null ? void 0 : _b.remove();
    __privateSet(this, _hiddenCopyElement, null);
    __privateMethod(this, _PDFViewer_instances, cleanupSwitchAnnotationEditorMode_fn).call(this);
  }
  _scrollUpdate() {
    if (this.pagesCount === 0) {
      return;
    }
    this.update();
  }
  pageLabelToPageNumber(label) {
    if (!this._pageLabels) {
      return null;
    }
    const i = this._pageLabels.indexOf(label);
    if (i < 0) {
      return null;
    }
    return i + 1;
  }
  scrollPageIntoView({
    pageNumber,
    destArray = null,
    allowNegativeOffset = false,
    ignoreDestinationZoom = false
  }) {
    if (!this.pdfDocument) {
      return;
    }
    const pageView = Number.isInteger(pageNumber) && this._pages[pageNumber - 1];
    if (!pageView) {
      console.error(`scrollPageIntoView: "${pageNumber}" is not a valid pageNumber parameter.`);
      return;
    }
    if (this.isInPresentationMode || !destArray) {
      this._setCurrentPageNumber(pageNumber, true);
      return;
    }
    let x = 0, y = 0;
    let width = 0, height = 0, widthScale, heightScale;
    const changeOrientation = pageView.rotation % 180 !== 0;
    const pageWidth = (changeOrientation ? pageView.height : pageView.width) / pageView.scale / PixelsPerInch.PDF_TO_CSS_UNITS;
    const pageHeight = (changeOrientation ? pageView.width : pageView.height) / pageView.scale / PixelsPerInch.PDF_TO_CSS_UNITS;
    let scale = 0;
    switch (destArray[1].name) {
      case "XYZ":
        x = destArray[2];
        y = destArray[3];
        scale = destArray[4];
        x = x !== null ? x : 0;
        y = y !== null ? y : pageHeight;
        break;
      case "Fit":
      case "FitB":
        scale = "page-fit";
        break;
      case "FitH":
      case "FitBH":
        y = destArray[2];
        scale = "page-width";
        if (y === null && this._location) {
          x = this._location.left;
          y = this._location.top;
        } else if (typeof y !== "number" || y < 0) {
          y = pageHeight;
        }
        break;
      case "FitV":
      case "FitBV":
        x = destArray[2];
        width = pageWidth;
        height = pageHeight;
        scale = "page-height";
        break;
      case "FitR":
        x = destArray[2];
        y = destArray[3];
        width = destArray[4] - x;
        height = destArray[5] - y;
        let hPadding = SCROLLBAR_PADDING, vPadding = VERTICAL_PADDING;
        if (this.removePageBorders) {
          hPadding = vPadding = 0;
        }
        widthScale = (this.container.clientWidth - hPadding) / width / PixelsPerInch.PDF_TO_CSS_UNITS;
        heightScale = (this.container.clientHeight - vPadding) / height / PixelsPerInch.PDF_TO_CSS_UNITS;
        scale = Math.min(Math.abs(widthScale), Math.abs(heightScale));
        break;
      default:
        console.error(`scrollPageIntoView: "${destArray[1].name}" is not a valid destination type.`);
        return;
    }
    if (!ignoreDestinationZoom) {
      if (scale && scale !== this._currentScale) {
        this.currentScaleValue = scale;
      } else if (this._currentScale === UNKNOWN_SCALE) {
        this.currentScaleValue = DEFAULT_SCALE_VALUE;
      }
    }
    if (scale === "page-fit" && !destArray[4]) {
      __privateMethod(this, _PDFViewer_instances, scrollIntoView_fn).call(this, pageView);
      return;
    }
    const boundingRect = [pageView.viewport.convertToViewportPoint(x, y), pageView.viewport.convertToViewportPoint(x + width, y + height)];
    let left = Math.min(boundingRect[0][0], boundingRect[1][0]);
    let top = Math.min(boundingRect[0][1], boundingRect[1][1]);
    if (!allowNegativeOffset) {
      left = Math.max(left, 0);
      top = Math.max(top, 0);
    }
    __privateMethod(this, _PDFViewer_instances, scrollIntoView_fn).call(this, pageView, {
      left,
      top
    });
  }
  _updateLocation(firstPage) {
    const currentScale = this._currentScale;
    const currentScaleValue = this._currentScaleValue;
    const normalizedScaleValue = parseFloat(currentScaleValue) === currentScale ? Math.round(currentScale * 1e4) / 100 : currentScaleValue;
    const pageNumber = firstPage.id;
    const currentPageView = this._pages[pageNumber - 1];
    const container = this.container;
    const topLeft = currentPageView.getPagePoint(container.scrollLeft - firstPage.x, container.scrollTop - firstPage.y);
    const intLeft = Math.round(topLeft[0]);
    const intTop = Math.round(topLeft[1]);
    let pdfOpenParams = `#page=${pageNumber}`;
    if (!this.isInPresentationMode) {
      pdfOpenParams += `&zoom=${normalizedScaleValue},${intLeft},${intTop}`;
    }
    this._location = {
      pageNumber,
      scale: normalizedScaleValue,
      top: intTop,
      left: intLeft,
      rotation: this._pagesRotation,
      pdfOpenParams
    };
  }
  update() {
    const visible = this._getVisiblePages();
    const visiblePages = visible.views, numVisiblePages = visiblePages.length;
    if (numVisiblePages === 0) {
      return;
    }
    const newCacheSize = Math.max(DEFAULT_CACHE_SIZE, 2 * numVisiblePages + 1);
    __privateGet(this, _buffer).resize(newCacheSize, visible.ids);
    this.renderingQueue.renderHighestPriority(visible);
    const isSimpleLayout = this._spreadMode === SpreadMode.NONE && (this._scrollMode === ScrollMode.PAGE || this._scrollMode === ScrollMode.VERTICAL);
    const currentId = this._currentPageNumber;
    let stillFullyVisible = false;
    for (const page of visiblePages) {
      if (page.percent < 100) {
        break;
      }
      if (page.id === currentId && isSimpleLayout) {
        stillFullyVisible = true;
        break;
      }
    }
    this._setCurrentPageNumber(stillFullyVisible ? currentId : visiblePages[0].id);
    this._updateLocation(visible.first);
    this.eventBus.dispatch("updateviewarea", {
      source: this,
      location: this._location
    });
  }
  containsElement(element) {
    return this.container.contains(element);
  }
  focus() {
    this.container.focus();
  }
  get _isContainerRtl() {
    return getComputedStyle(this.container).direction === "rtl";
  }
  get isInPresentationMode() {
    return this.presentationModeState === PresentationModeState.FULLSCREEN;
  }
  get isChangingPresentationMode() {
    return this.presentationModeState === PresentationModeState.CHANGING;
  }
  get isHorizontalScrollbarEnabled() {
    return this.isInPresentationMode ? false : this.container.scrollWidth > this.container.clientWidth;
  }
  get isVerticalScrollbarEnabled() {
    return this.isInPresentationMode ? false : this.container.scrollHeight > this.container.clientHeight;
  }
  _getVisiblePages() {
    const views = this._scrollMode === ScrollMode.PAGE ? __privateGet(this, _scrollModePageState).pages : this._pages, horizontal = this._scrollMode === ScrollMode.HORIZONTAL, rtl = horizontal && this._isContainerRtl;
    return getVisibleElements({
      scrollEl: this.container,
      views,
      sortByVisibility: true,
      horizontal,
      rtl
    });
  }
  cleanup() {
    for (const pageView of this._pages) {
      if (pageView.renderingState !== RenderingStates.FINISHED) {
        pageView.reset();
      }
    }
  }
  _cancelRendering() {
    for (const pageView of this._pages) {
      pageView.cancelRendering();
    }
  }
  forceRendering(currentlyVisiblePages) {
    const visiblePages = currentlyVisiblePages || this._getVisiblePages();
    const scrollAhead = __privateMethod(this, _PDFViewer_instances, getScrollAhead_fn2).call(this, visiblePages);
    const preRenderExtra = this._spreadMode !== SpreadMode.NONE && this._scrollMode !== ScrollMode.HORIZONTAL;
    const pageView = this.renderingQueue.getHighestPriority(visiblePages, this._pages, scrollAhead, preRenderExtra);
    if (pageView) {
      __privateMethod(this, _PDFViewer_instances, ensurePdfPageLoaded_fn2).call(this, pageView).then(() => {
        this.renderingQueue.renderView(pageView);
      });
      return true;
    }
    return false;
  }
  get hasEqualPageSizes() {
    const firstPageView = this._pages[0];
    for (let i = 1, ii = this._pages.length; i < ii; ++i) {
      const pageView = this._pages[i];
      if (pageView.width !== firstPageView.width || pageView.height !== firstPageView.height) {
        return false;
      }
    }
    return true;
  }
  getPagesOverview() {
    let initialOrientation;
    return this._pages.map((pageView) => {
      const viewport = pageView.pdfPage.getViewport({
        scale: 1
      });
      const orientation = isPortraitOrientation(viewport);
      if (initialOrientation === void 0) {
        initialOrientation = orientation;
      } else if (this.enablePrintAutoRotate && orientation !== initialOrientation) {
        return {
          width: viewport.height,
          height: viewport.width,
          rotation: (viewport.rotation - 90) % 360
        };
      }
      return {
        width: viewport.width,
        height: viewport.height,
        rotation: viewport.rotation
      };
    });
  }
  get optionalContentConfigPromise() {
    if (!this.pdfDocument) {
      return Promise.resolve(null);
    }
    if (!this._optionalContentConfigPromise) {
      console.error("optionalContentConfigPromise: Not initialized yet.");
      return this.pdfDocument.getOptionalContentConfig({
        intent: "display"
      });
    }
    return this._optionalContentConfigPromise;
  }
  set optionalContentConfigPromise(promise) {
    if (!(promise instanceof Promise)) {
      throw new Error(`Invalid optionalContentConfigPromise: ${promise}`);
    }
    if (!this.pdfDocument) {
      return;
    }
    if (!this._optionalContentConfigPromise) {
      return;
    }
    this._optionalContentConfigPromise = promise;
    this.refresh(false, {
      optionalContentConfigPromise: promise
    });
    this.eventBus.dispatch("optionalcontentconfigchanged", {
      source: this,
      promise
    });
  }
  get scrollMode() {
    return this._scrollMode;
  }
  set scrollMode(mode) {
    if (this._scrollMode === mode) {
      return;
    }
    if (!isValidScrollMode(mode)) {
      throw new Error(`Invalid scroll mode: ${mode}`);
    }
    if (this.pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE) {
      return;
    }
    this._previousScrollMode = this._scrollMode;
    this._scrollMode = mode;
    this.eventBus.dispatch("scrollmodechanged", {
      source: this,
      mode
    });
    this._updateScrollMode(this._currentPageNumber);
  }
  _updateScrollMode(pageNumber = null) {
    const scrollMode = this._scrollMode, viewer = this.viewer;
    viewer.classList.toggle("scrollHorizontal", scrollMode === ScrollMode.HORIZONTAL);
    viewer.classList.toggle("scrollWrapped", scrollMode === ScrollMode.WRAPPED);
    if (!this.pdfDocument || !pageNumber) {
      return;
    }
    if (scrollMode === ScrollMode.PAGE) {
      __privateMethod(this, _PDFViewer_instances, ensurePageViewVisible_fn).call(this);
    } else if (this._previousScrollMode === ScrollMode.PAGE) {
      this._updateSpreadMode();
    }
    if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
      __privateMethod(this, _PDFViewer_instances, setScale_fn).call(this, this._currentScaleValue, {
        noScroll: true
      });
    }
    this._setCurrentPageNumber(pageNumber, true);
    this.update();
  }
  get spreadMode() {
    return this._spreadMode;
  }
  set spreadMode(mode) {
    if (this._spreadMode === mode) {
      return;
    }
    if (!isValidSpreadMode(mode)) {
      throw new Error(`Invalid spread mode: ${mode}`);
    }
    this._spreadMode = mode;
    this.eventBus.dispatch("spreadmodechanged", {
      source: this,
      mode
    });
    this._updateSpreadMode(this._currentPageNumber);
  }
  _updateSpreadMode(pageNumber = null) {
    if (!this.pdfDocument) {
      return;
    }
    const viewer = this.viewer, pages = this._pages;
    if (this._scrollMode === ScrollMode.PAGE) {
      __privateMethod(this, _PDFViewer_instances, ensurePageViewVisible_fn).call(this);
    } else {
      viewer.textContent = "";
      if (this._spreadMode === SpreadMode.NONE) {
        for (const pageView of this._pages) {
          viewer.append(pageView.div);
        }
      } else {
        const parity = this._spreadMode - 1;
        let spread = null;
        for (let i = 0, ii = pages.length; i < ii; ++i) {
          if (spread === null) {
            spread = document.createElement("div");
            spread.className = "spread";
            viewer.append(spread);
          } else if (i % 2 === parity) {
            spread = spread.cloneNode(false);
            viewer.append(spread);
          }
          spread.append(pages[i].div);
        }
      }
    }
    if (!pageNumber) {
      return;
    }
    if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
      __privateMethod(this, _PDFViewer_instances, setScale_fn).call(this, this._currentScaleValue, {
        noScroll: true
      });
    }
    this._setCurrentPageNumber(pageNumber, true);
    this.update();
  }
  _getPageAdvance(currentPageNumber, previous = false) {
    switch (this._scrollMode) {
      case ScrollMode.WRAPPED: {
        const {
          views
        } = this._getVisiblePages(), pageLayout = /* @__PURE__ */ new Map();
        for (const {
          id,
          y,
          percent,
          widthPercent
        } of views) {
          if (percent === 0 || widthPercent < 100) {
            continue;
          }
          let yArray = pageLayout.get(y);
          if (!yArray) {
            pageLayout.set(y, yArray || (yArray = []));
          }
          yArray.push(id);
        }
        for (const yArray of pageLayout.values()) {
          const currentIndex = yArray.indexOf(currentPageNumber);
          if (currentIndex === -1) {
            continue;
          }
          const numPages = yArray.length;
          if (numPages === 1) {
            break;
          }
          if (previous) {
            for (let i = currentIndex - 1, ii = 0; i >= ii; i--) {
              const currentId = yArray[i], expectedId = yArray[i + 1] - 1;
              if (currentId < expectedId) {
                return currentPageNumber - expectedId;
              }
            }
          } else {
            for (let i = currentIndex + 1, ii = numPages; i < ii; i++) {
              const currentId = yArray[i], expectedId = yArray[i - 1] + 1;
              if (currentId > expectedId) {
                return expectedId - currentPageNumber;
              }
            }
          }
          if (previous) {
            const firstId = yArray[0];
            if (firstId < currentPageNumber) {
              return currentPageNumber - firstId + 1;
            }
          } else {
            const lastId = yArray[numPages - 1];
            if (lastId > currentPageNumber) {
              return lastId - currentPageNumber + 1;
            }
          }
          break;
        }
        break;
      }
      case ScrollMode.HORIZONTAL: {
        break;
      }
      case ScrollMode.PAGE:
      case ScrollMode.VERTICAL: {
        if (this._spreadMode === SpreadMode.NONE) {
          break;
        }
        const parity = this._spreadMode - 1;
        if (previous && currentPageNumber % 2 !== parity) {
          break;
        } else if (!previous && currentPageNumber % 2 === parity) {
          break;
        }
        const {
          views
        } = this._getVisiblePages(), expectedId = previous ? currentPageNumber - 1 : currentPageNumber + 1;
        for (const {
          id,
          percent,
          widthPercent
        } of views) {
          if (id !== expectedId) {
            continue;
          }
          if (percent > 0 && widthPercent === 100) {
            return 2;
          }
          break;
        }
        break;
      }
    }
    return 1;
  }
  nextPage() {
    const currentPageNumber = this._currentPageNumber, pagesCount = this.pagesCount;
    if (currentPageNumber >= pagesCount) {
      return false;
    }
    const advance = this._getPageAdvance(currentPageNumber, false) || 1;
    this.currentPageNumber = Math.min(currentPageNumber + advance, pagesCount);
    return true;
  }
  previousPage() {
    const currentPageNumber = this._currentPageNumber;
    if (currentPageNumber <= 1) {
      return false;
    }
    const advance = this._getPageAdvance(currentPageNumber, true) || 1;
    this.currentPageNumber = Math.max(currentPageNumber - advance, 1);
    return true;
  }
  updateScale({
    drawingDelay,
    scaleFactor = null,
    steps = null,
    origin
  }) {
    if (steps === null && scaleFactor === null) {
      throw new Error("Invalid updateScale options: either `steps` or `scaleFactor` must be provided.");
    }
    if (!this.pdfDocument) {
      return;
    }
    let newScale = this._currentScale;
    if (scaleFactor > 0 && scaleFactor !== 1) {
      newScale = Math.round(newScale * scaleFactor * 100) / 100;
    } else if (steps) {
      const delta = steps > 0 ? DEFAULT_SCALE_DELTA : 1 / DEFAULT_SCALE_DELTA;
      const round = steps > 0 ? Math.ceil : Math.floor;
      steps = Math.abs(steps);
      do {
        newScale = round((newScale * delta).toFixed(2) * 10) / 10;
      } while (--steps > 0);
    }
    newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
    __privateMethod(this, _PDFViewer_instances, setScale_fn).call(this, newScale, {
      noScroll: false,
      drawingDelay,
      origin
    });
  }
  increaseScale(options = {}) {
    var _a2;
    this.updateScale({
      ...options,
      steps: (_a2 = options.steps) != null ? _a2 : 1
    });
  }
  decreaseScale(options = {}) {
    var _a2;
    this.updateScale({
      ...options,
      steps: -((_a2 = options.steps) != null ? _a2 : 1)
    });
  }
  get containerTopLeft() {
    return __privateGet(this, _containerTopLeft) || __privateSet(this, _containerTopLeft, [this.container.offsetTop, this.container.offsetLeft]);
  }
  get annotationEditorMode() {
    return __privateGet(this, _annotationEditorUIManager) ? __privateGet(this, _annotationEditorMode) : AnnotationEditorType.DISABLE;
  }
  set annotationEditorMode({
    mode,
    editId = null,
    isFromKeyboard = false
  }) {
    var _a2;
    if (!__privateGet(this, _annotationEditorUIManager)) {
      throw new Error(`The AnnotationEditor is not enabled.`);
    }
    if (__privateGet(this, _annotationEditorMode) === mode) {
      return;
    }
    if (!isValidAnnotationEditorMode(mode)) {
      throw new Error(`Invalid AnnotationEditor mode: ${mode}`);
    }
    if (!this.pdfDocument) {
      return;
    }
    if (mode === AnnotationEditorType.STAMP) {
      (_a2 = __privateGet(this, _mlManager2)) == null ? void 0 : _a2.loadModel("altText");
    }
    const {
      eventBus
    } = this;
    const updater = () => {
      __privateMethod(this, _PDFViewer_instances, cleanupSwitchAnnotationEditorMode_fn).call(this);
      __privateSet(this, _annotationEditorMode, mode);
      __privateGet(this, _annotationEditorUIManager).updateMode(mode, editId, isFromKeyboard);
      eventBus.dispatch("annotationeditormodechanged", {
        source: this,
        mode
      });
    };
    if (mode === AnnotationEditorType.NONE || __privateGet(this, _annotationEditorMode) === AnnotationEditorType.NONE) {
      const isEditing = mode !== AnnotationEditorType.NONE;
      if (!isEditing) {
        this.pdfDocument.annotationStorage.resetModifiedIds();
      }
      for (const pageView of this._pages) {
        pageView.toggleEditingMode(isEditing);
      }
      const idsToRefresh = __privateMethod(this, _PDFViewer_instances, switchToEditAnnotationMode_fn).call(this);
      if (isEditing && idsToRefresh) {
        __privateMethod(this, _PDFViewer_instances, cleanupSwitchAnnotationEditorMode_fn).call(this);
        __privateSet(this, _switchAnnotationEditorModeAC, new AbortController());
        const signal = AbortSignal.any([__privateGet(this, _eventAbortController5).signal, __privateGet(this, _switchAnnotationEditorModeAC).signal]);
        eventBus._on("pagerendered", ({
          pageNumber
        }) => {
          idsToRefresh.delete(pageNumber);
          if (idsToRefresh.size === 0) {
            __privateSet(this, _switchAnnotationEditorModeTimeoutId, setTimeout(updater, 0));
          }
        }, {
          signal
        });
        return;
      }
    }
    updater();
  }
  refresh(noUpdate = false, updateArgs = /* @__PURE__ */ Object.create(null)) {
    if (!this.pdfDocument) {
      return;
    }
    for (const pageView of this._pages) {
      pageView.update(updateArgs);
    }
    if (__privateGet(this, _scaleTimeoutId) !== null) {
      clearTimeout(__privateGet(this, _scaleTimeoutId));
      __privateSet(this, _scaleTimeoutId, null);
    }
    if (!noUpdate) {
      this.update();
    }
  }
}
_buffer = new WeakMap();
_altTextManager = new WeakMap();
_annotationEditorHighlightColors = new WeakMap();
_annotationEditorMode = new WeakMap();
_annotationEditorUIManager = new WeakMap();
_annotationMode2 = new WeakMap();
_containerTopLeft = new WeakMap();
_editorUndoBar = new WeakMap();
_enableHWA2 = new WeakMap();
_enableHighlightFloatingButton = new WeakMap();
_enablePermissions2 = new WeakMap();
_enableUpdatedAddImage = new WeakMap();
_enableNewAltTextWhenAddingImage = new WeakMap();
_eventAbortController5 = new WeakMap();
_mlManager2 = new WeakMap();
_switchAnnotationEditorModeAC = new WeakMap();
_switchAnnotationEditorModeTimeoutId = new WeakMap();
_getAllTextInProgress = new WeakMap();
_hiddenCopyElement = new WeakMap();
_interruptCopyCondition = new WeakMap();
_previousContainerHeight = new WeakMap();
_resizeObserver2 = new WeakMap();
_scrollModePageState = new WeakMap();
_scaleTimeoutId = new WeakMap();
_supportsPinchToZoom = new WeakMap();
_textLayerMode2 = new WeakMap();
_PDFViewer_instances = new WeakSet();
initializePermissions_fn = function(permissions) {
  const params = {
    annotationEditorMode: __privateGet(this, _annotationEditorMode),
    annotationMode: __privateGet(this, _annotationMode2),
    textLayerMode: __privateGet(this, _textLayerMode2)
  };
  if (!permissions) {
    return params;
  }
  if (!permissions.includes(PermissionFlag.COPY) && __privateGet(this, _textLayerMode2) === TextLayerMode.ENABLE) {
    params.textLayerMode = TextLayerMode.ENABLE_PERMISSIONS;
  }
  if (!permissions.includes(PermissionFlag.MODIFY_CONTENTS)) {
    params.annotationEditorMode = AnnotationEditorType.DISABLE;
  }
  if (!permissions.includes(PermissionFlag.MODIFY_ANNOTATIONS) && !permissions.includes(PermissionFlag.FILL_INTERACTIVE_FORMS) && __privateGet(this, _annotationMode2) === AnnotationMode.ENABLE_FORMS) {
    params.annotationMode = AnnotationMode.ENABLE;
  }
  return params;
};
onePageRenderedOrForceFetch_fn = async function(signal) {
  if (document.visibilityState === "hidden" || !this.container.offsetParent || this._getVisiblePages().views.length === 0) {
    return;
  }
  const hiddenCapability = Promise.withResolvers(), ac = new AbortController();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      hiddenCapability.resolve();
    }
  }, {
    signal: typeof AbortSignal.any === "function" ? AbortSignal.any([signal, ac.signal]) : signal
  });
  await Promise.race([this._onePageRenderedCapability.promise, hiddenCapability.promise]);
  ac.abort();
};
copyCallback_fn = function(textLayerMode, event) {
  const selection = document.getSelection();
  const {
    focusNode,
    anchorNode
  } = selection;
  if (anchorNode && focusNode && selection.containsNode(__privateGet(this, _hiddenCopyElement))) {
    if (__privateGet(this, _getAllTextInProgress) || textLayerMode === TextLayerMode.ENABLE_PERMISSIONS) {
      stopEvent(event);
      return;
    }
    __privateSet(this, _getAllTextInProgress, true);
    const {
      classList
    } = this.viewer;
    classList.add("copyAll");
    const ac = new AbortController();
    window.addEventListener("keydown", (ev) => __privateSet(this, _interruptCopyCondition, ev.key === "Escape"), {
      signal: ac.signal
    });
    this.getAllText().then(async (text) => {
      if (text !== null) {
        await navigator.clipboard.writeText(text);
      }
    }).catch((reason) => {
      console.warn(`Something goes wrong when extracting the text: ${reason.message}`);
    }).finally(() => {
      __privateSet(this, _getAllTextInProgress, false);
      __privateSet(this, _interruptCopyCondition, false);
      ac.abort();
      classList.remove("copyAll");
    });
    stopEvent(event);
  }
};
ensurePageViewVisible_fn = function() {
  if (this._scrollMode !== ScrollMode.PAGE) {
    throw new Error("#ensurePageViewVisible: Invalid scrollMode value.");
  }
  const pageNumber = this._currentPageNumber, state = __privateGet(this, _scrollModePageState), viewer = this.viewer;
  viewer.textContent = "";
  state.pages.length = 0;
  if (this._spreadMode === SpreadMode.NONE && !this.isInPresentationMode) {
    const pageView = this._pages[pageNumber - 1];
    viewer.append(pageView.div);
    state.pages.push(pageView);
  } else {
    const pageIndexSet = /* @__PURE__ */ new Set(), parity = this._spreadMode - 1;
    if (parity === -1) {
      pageIndexSet.add(pageNumber - 1);
    } else if (pageNumber % 2 !== parity) {
      pageIndexSet.add(pageNumber - 1);
      pageIndexSet.add(pageNumber);
    } else {
      pageIndexSet.add(pageNumber - 2);
      pageIndexSet.add(pageNumber - 1);
    }
    const spread = document.createElement("div");
    spread.className = "spread";
    if (this.isInPresentationMode) {
      const dummyPage = document.createElement("div");
      dummyPage.className = "dummyPage";
      spread.append(dummyPage);
    }
    for (const i of pageIndexSet) {
      const pageView = this._pages[i];
      if (!pageView) {
        continue;
      }
      spread.append(pageView.div);
      state.pages.push(pageView);
    }
    viewer.append(spread);
  }
  state.scrollDown = pageNumber >= state.previousPageNumber;
  state.previousPageNumber = pageNumber;
};
scrollIntoView_fn = function(pageView, pageSpot = null) {
  const {
    div,
    id
  } = pageView;
  if (this._currentPageNumber !== id) {
    this._setCurrentPageNumber(id);
  }
  if (this._scrollMode === ScrollMode.PAGE) {
    __privateMethod(this, _PDFViewer_instances, ensurePageViewVisible_fn).call(this);
    this.update();
  }
  if (!pageSpot && !this.isInPresentationMode) {
    const left = div.offsetLeft + div.clientLeft, right = left + div.clientWidth;
    const {
      scrollLeft,
      clientWidth
    } = this.container;
    if (this._scrollMode === ScrollMode.HORIZONTAL || left < scrollLeft || right > scrollLeft + clientWidth) {
      pageSpot = {
        left: 0,
        top: 0
      };
    }
  }
  scrollIntoView(div, pageSpot);
  if (!this._currentScaleValue && this._location) {
    this._location = null;
  }
};
isSameScale_fn = function(newScale) {
  return newScale === this._currentScale || Math.abs(newScale - this._currentScale) < 1e-15;
};
setScaleUpdatePages_fn = function(newScale, newValue, {
  noScroll = false,
  preset = false,
  drawingDelay = -1,
  origin = null
}) {
  this._currentScaleValue = newValue.toString();
  if (__privateMethod(this, _PDFViewer_instances, isSameScale_fn).call(this, newScale)) {
    if (preset) {
      this.eventBus.dispatch("scalechanging", {
        source: this,
        scale: newScale,
        presetValue: newValue
      });
    }
    return;
  }
  this.viewer.style.setProperty("--scale-factor", newScale * PixelsPerInch.PDF_TO_CSS_UNITS);
  const postponeDrawing = drawingDelay >= 0 && drawingDelay < 1e3;
  this.refresh(true, {
    scale: newScale,
    drawingDelay: postponeDrawing ? drawingDelay : -1
  });
  if (postponeDrawing) {
    __privateSet(this, _scaleTimeoutId, setTimeout(() => {
      __privateSet(this, _scaleTimeoutId, null);
      this.refresh();
    }, drawingDelay));
  }
  const previousScale = this._currentScale;
  this._currentScale = newScale;
  if (!noScroll) {
    let page = this._currentPageNumber, dest;
    if (this._location && !(this.isInPresentationMode || this.isChangingPresentationMode)) {
      page = this._location.pageNumber;
      dest = [null, {
        name: "XYZ"
      }, this._location.left, this._location.top, null];
    }
    this.scrollPageIntoView({
      pageNumber: page,
      destArray: dest,
      allowNegativeOffset: true
    });
    if (Array.isArray(origin)) {
      const scaleDiff = newScale / previousScale - 1;
      const [top, left] = this.containerTopLeft;
      this.container.scrollLeft += (origin[0] - left) * scaleDiff;
      this.container.scrollTop += (origin[1] - top) * scaleDiff;
    }
  }
  this.eventBus.dispatch("scalechanging", {
    source: this,
    scale: newScale,
    presetValue: preset ? newValue : void 0
  });
  if (this.defaultRenderingQueue) {
    this.update();
  }
};
pageWidthScaleFactor_get = function() {
  if (this._spreadMode !== SpreadMode.NONE && this._scrollMode !== ScrollMode.HORIZONTAL) {
    return 2;
  }
  return 1;
};
setScale_fn = function(value, options) {
  let scale = parseFloat(value);
  if (scale > 0) {
    options.preset = false;
    __privateMethod(this, _PDFViewer_instances, setScaleUpdatePages_fn).call(this, scale, value, options);
  } else {
    const currentPage = this._pages[this._currentPageNumber - 1];
    if (!currentPage) {
      return;
    }
    let hPadding = SCROLLBAR_PADDING, vPadding = VERTICAL_PADDING;
    if (this.isInPresentationMode) {
      hPadding = vPadding = 4;
      if (this._spreadMode !== SpreadMode.NONE) {
        hPadding *= 2;
      }
    } else if (this.removePageBorders) {
      hPadding = vPadding = 0;
    } else if (this._scrollMode === ScrollMode.HORIZONTAL) {
      [hPadding, vPadding] = [vPadding, hPadding];
    }
    const pageWidthScale = (this.container.clientWidth - hPadding) / currentPage.width * currentPage.scale / __privateGet(this, _PDFViewer_instances, pageWidthScaleFactor_get);
    const pageHeightScale = (this.container.clientHeight - vPadding) / currentPage.height * currentPage.scale;
    switch (value) {
      case "page-actual":
        scale = 1;
        break;
      case "page-width":
        scale = pageWidthScale;
        break;
      case "page-height":
        scale = pageHeightScale;
        break;
      case "page-fit":
        scale = Math.min(pageWidthScale, pageHeightScale);
        break;
      case "auto":
        const horizontalScale = isPortraitOrientation(currentPage) ? pageWidthScale : Math.min(pageHeightScale, pageWidthScale);
        scale = Math.min(MAX_AUTO_SCALE, horizontalScale);
        break;
      default:
        console.error(`#setScale: "${value}" is an unknown zoom value.`);
        return;
    }
    options.preset = true;
    __privateMethod(this, _PDFViewer_instances, setScaleUpdatePages_fn).call(this, scale, value, options);
  }
};
resetCurrentPageView_fn = function() {
  const pageView = this._pages[this._currentPageNumber - 1];
  if (this.isInPresentationMode) {
    __privateMethod(this, _PDFViewer_instances, setScale_fn).call(this, this._currentScaleValue, {
      noScroll: true
    });
  }
  __privateMethod(this, _PDFViewer_instances, scrollIntoView_fn).call(this, pageView);
};
switchToEditAnnotationMode_fn = function() {
  const visible = this._getVisiblePages();
  const pagesToRefresh = [];
  const {
    ids,
    views
  } = visible;
  for (const page of views) {
    const {
      view
    } = page;
    if (!view.hasEditableAnnotations()) {
      ids.delete(view.id);
      continue;
    }
    pagesToRefresh.push(page);
  }
  if (pagesToRefresh.length === 0) {
    return null;
  }
  this.renderingQueue.renderHighestPriority({
    first: pagesToRefresh[0],
    last: pagesToRefresh.at(-1),
    views: pagesToRefresh,
    ids
  });
  return ids;
};
ensurePdfPageLoaded_fn2 = async function(pageView) {
  if (pageView.pdfPage) {
    return pageView.pdfPage;
  }
  try {
    const pdfPage = await this.pdfDocument.getPage(pageView.id);
    if (!pageView.pdfPage) {
      pageView.setPdfPage(pdfPage);
    }
    return pdfPage;
  } catch (reason) {
    console.error("Unable to get page for page view", reason);
    return null;
  }
};
getScrollAhead_fn2 = function(visible) {
  var _a2, _b;
  if (((_a2 = visible.first) == null ? void 0 : _a2.id) === 1) {
    return true;
  } else if (((_b = visible.last) == null ? void 0 : _b.id) === this.pagesCount) {
    return false;
  }
  switch (this._scrollMode) {
    case ScrollMode.PAGE:
      return __privateGet(this, _scrollModePageState).scrollDown;
    case ScrollMode.HORIZONTAL:
      return this.scroll.right;
  }
  return this.scroll.down;
};
updateContainerHeightCss_fn = function(height = this.container.clientHeight) {
  if (height !== __privateGet(this, _previousContainerHeight)) {
    __privateSet(this, _previousContainerHeight, height);
    docStyle.setProperty("--viewer-container-height", `${height}px`);
  }
};
resizeObserverCallback_fn2 = function(entries) {
  for (const entry of entries) {
    if (entry.target === this.container) {
      __privateMethod(this, _PDFViewer_instances, updateContainerHeightCss_fn).call(this, Math.floor(entry.borderBoxSize[0].blockSize));
      __privateSet(this, _containerTopLeft, null);
      break;
    }
  }
};
cleanupSwitchAnnotationEditorMode_fn = function() {
  var _a2;
  (_a2 = __privateGet(this, _switchAnnotationEditorModeAC)) == null ? void 0 : _a2.abort();
  __privateSet(this, _switchAnnotationEditorModeAC, null);
  if (__privateGet(this, _switchAnnotationEditorModeTimeoutId) !== null) {
    clearTimeout(__privateGet(this, _switchAnnotationEditorModeTimeoutId));
    __privateSet(this, _switchAnnotationEditorModeTimeoutId, null);
  }
};
;
class SecondaryToolbar {
  constructor(options, eventBus) {
    __privateAdd(this, _SecondaryToolbar_instances);
    __privateAdd(this, _opts2);
    __privateSet(this, _opts2, options);
    const buttons = [{
      element: options.presentationModeButton,
      eventName: "presentationmode",
      close: true
    }, {
      element: options.printButton,
      eventName: "print",
      close: true
    }, {
      element: options.downloadButton,
      eventName: "download",
      close: true
    }, {
      element: options.viewBookmarkButton,
      eventName: null,
      close: true
    }, {
      element: options.firstPageButton,
      eventName: "firstpage",
      close: true
    }, {
      element: options.lastPageButton,
      eventName: "lastpage",
      close: true
    }, {
      element: options.pageRotateCwButton,
      eventName: "rotatecw",
      close: false
    }, {
      element: options.pageRotateCcwButton,
      eventName: "rotateccw",
      close: false
    }, {
      element: options.cursorSelectToolButton,
      eventName: "switchcursortool",
      eventDetails: {
        tool: CursorTool.SELECT
      },
      close: true
    }, {
      element: options.cursorHandToolButton,
      eventName: "switchcursortool",
      eventDetails: {
        tool: CursorTool.HAND
      },
      close: true
    }, {
      element: options.scrollPageButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: ScrollMode.PAGE
      },
      close: true
    }, {
      element: options.scrollVerticalButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: ScrollMode.VERTICAL
      },
      close: true
    }, {
      element: options.scrollHorizontalButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: ScrollMode.HORIZONTAL
      },
      close: true
    }, {
      element: options.scrollWrappedButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: ScrollMode.WRAPPED
      },
      close: true
    }, {
      element: options.spreadNoneButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: SpreadMode.NONE
      },
      close: true
    }, {
      element: options.spreadOddButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: SpreadMode.ODD
      },
      close: true
    }, {
      element: options.spreadEvenButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: SpreadMode.EVEN
      },
      close: true
    }, {
      element: options.imageAltTextSettingsButton,
      eventName: "imagealttextsettings",
      close: true
    }, {
      element: options.documentPropertiesButton,
      eventName: "documentproperties",
      close: true
    }];
    buttons.push({
      element: options.openFileButton,
      eventName: "openfile",
      close: true
    });
    this.eventBus = eventBus;
    this.opened = false;
    __privateMethod(this, _SecondaryToolbar_instances, bindListeners_fn2).call(this, buttons);
    this.reset();
  }
  get isOpen() {
    return this.opened;
  }
  setPageNumber(pageNumber) {
    this.pageNumber = pageNumber;
    __privateMethod(this, _SecondaryToolbar_instances, updateUIState_fn3).call(this);
  }
  setPagesCount(pagesCount) {
    this.pagesCount = pagesCount;
    __privateMethod(this, _SecondaryToolbar_instances, updateUIState_fn3).call(this);
  }
  reset() {
    this.pageNumber = 0;
    this.pagesCount = 0;
    __privateMethod(this, _SecondaryToolbar_instances, updateUIState_fn3).call(this);
    this.eventBus.dispatch("switchcursortool", {
      source: this,
      reset: true
    });
    __privateMethod(this, _SecondaryToolbar_instances, scrollModeChanged_fn).call(this, {
      mode: ScrollMode.VERTICAL
    });
    __privateMethod(this, _SecondaryToolbar_instances, spreadModeChanged_fn).call(this, {
      mode: SpreadMode.NONE
    });
  }
  open() {
    if (this.opened) {
      return;
    }
    this.opened = true;
    const {
      toggleButton,
      toolbar
    } = __privateGet(this, _opts2);
    toggleExpandedBtn(toggleButton, true, toolbar);
  }
  close() {
    if (!this.opened) {
      return;
    }
    this.opened = false;
    const {
      toggleButton,
      toolbar
    } = __privateGet(this, _opts2);
    toggleExpandedBtn(toggleButton, false, toolbar);
  }
  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }
}
_opts2 = new WeakMap();
_SecondaryToolbar_instances = new WeakSet();
updateUIState_fn3 = function() {
  const {
    firstPageButton,
    lastPageButton,
    pageRotateCwButton,
    pageRotateCcwButton
  } = __privateGet(this, _opts2);
  firstPageButton.disabled = this.pageNumber <= 1;
  lastPageButton.disabled = this.pageNumber >= this.pagesCount;
  pageRotateCwButton.disabled = this.pagesCount === 0;
  pageRotateCcwButton.disabled = this.pagesCount === 0;
};
bindListeners_fn2 = function(buttons) {
  const {
    eventBus
  } = this;
  const {
    toggleButton
  } = __privateGet(this, _opts2);
  toggleButton.addEventListener("click", this.toggle.bind(this));
  for (const {
    element,
    eventName,
    close,
    eventDetails
  } of buttons) {
    element.addEventListener("click", (evt) => {
      if (eventName !== null) {
        eventBus.dispatch(eventName, {
          source: this,
          ...eventDetails
        });
      }
      if (close) {
        this.close();
      }
      eventBus.dispatch("reporttelemetry", {
        source: this,
        details: {
          type: "buttons",
          data: {
            id: element.id
          }
        }
      });
    });
  }
  eventBus._on("cursortoolchanged", __privateMethod(this, _SecondaryToolbar_instances, cursorToolChanged_fn).bind(this));
  eventBus._on("scrollmodechanged", __privateMethod(this, _SecondaryToolbar_instances, scrollModeChanged_fn).bind(this));
  eventBus._on("spreadmodechanged", __privateMethod(this, _SecondaryToolbar_instances, spreadModeChanged_fn).bind(this));
};
cursorToolChanged_fn = function({
  tool,
  disabled
}) {
  const {
    cursorSelectToolButton,
    cursorHandToolButton
  } = __privateGet(this, _opts2);
  toggleCheckedBtn(cursorSelectToolButton, tool === CursorTool.SELECT);
  toggleCheckedBtn(cursorHandToolButton, tool === CursorTool.HAND);
  cursorSelectToolButton.disabled = disabled;
  cursorHandToolButton.disabled = disabled;
};
scrollModeChanged_fn = function({
  mode
}) {
  const {
    scrollPageButton,
    scrollVerticalButton,
    scrollHorizontalButton,
    scrollWrappedButton,
    spreadNoneButton,
    spreadOddButton,
    spreadEvenButton
  } = __privateGet(this, _opts2);
  toggleCheckedBtn(scrollPageButton, mode === ScrollMode.PAGE);
  toggleCheckedBtn(scrollVerticalButton, mode === ScrollMode.VERTICAL);
  toggleCheckedBtn(scrollHorizontalButton, mode === ScrollMode.HORIZONTAL);
  toggleCheckedBtn(scrollWrappedButton, mode === ScrollMode.WRAPPED);
  const forceScrollModePage = this.pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE;
  scrollPageButton.disabled = forceScrollModePage;
  scrollVerticalButton.disabled = forceScrollModePage;
  scrollHorizontalButton.disabled = forceScrollModePage;
  scrollWrappedButton.disabled = forceScrollModePage;
  const isHorizontal = mode === ScrollMode.HORIZONTAL;
  spreadNoneButton.disabled = isHorizontal;
  spreadOddButton.disabled = isHorizontal;
  spreadEvenButton.disabled = isHorizontal;
};
spreadModeChanged_fn = function({
  mode
}) {
  const {
    spreadNoneButton,
    spreadOddButton,
    spreadEvenButton
  } = __privateGet(this, _opts2);
  toggleCheckedBtn(spreadNoneButton, mode === SpreadMode.NONE);
  toggleCheckedBtn(spreadOddButton, mode === SpreadMode.ODD);
  toggleCheckedBtn(spreadEvenButton, mode === SpreadMode.EVEN);
};
;
class Toolbar {
  constructor(options, eventBus, toolbarDensity = 0) {
    __privateAdd(this, _Toolbar_instances);
    __privateAdd(this, _opts3);
    __privateSet(this, _opts3, options);
    this.eventBus = eventBus;
    const buttons = [{
      element: options.previous,
      eventName: "previouspage"
    }, {
      element: options.next,
      eventName: "nextpage"
    }, {
      element: options.zoomIn,
      eventName: "zoomin"
    }, {
      element: options.zoomOut,
      eventName: "zoomout"
    }, {
      element: options.print,
      eventName: "print"
    }, {
      element: options.download,
      eventName: "download"
    }, {
      element: options.editorFreeTextButton,
      eventName: "switchannotationeditormode",
      eventDetails: {
        get mode() {
          const {
            classList
          } = options.editorFreeTextButton;
          return classList.contains("toggled") ? AnnotationEditorType.NONE : AnnotationEditorType.FREETEXT;
        }
      }
    }, {
      element: options.editorHighlightButton,
      eventName: "switchannotationeditormode",
      eventDetails: {
        get mode() {
          const {
            classList
          } = options.editorHighlightButton;
          return classList.contains("toggled") ? AnnotationEditorType.NONE : AnnotationEditorType.HIGHLIGHT;
        }
      }
    }, {
      element: options.editorInkButton,
      eventName: "switchannotationeditormode",
      eventDetails: {
        get mode() {
          const {
            classList
          } = options.editorInkButton;
          return classList.contains("toggled") ? AnnotationEditorType.NONE : AnnotationEditorType.INK;
        }
      }
    }, {
      element: options.editorStampButton,
      eventName: "switchannotationeditormode",
      eventDetails: {
        get mode() {
          const {
            classList
          } = options.editorStampButton;
          return classList.contains("toggled") ? AnnotationEditorType.NONE : AnnotationEditorType.STAMP;
        }
      },
      telemetry: {
        type: "editing",
        data: {
          action: "pdfjs.image.icon_click"
        }
      }
    }];
    __privateMethod(this, _Toolbar_instances, bindListeners_fn3).call(this, buttons);
    __privateMethod(this, _Toolbar_instances, updateToolbarDensity_fn).call(this, {
      value: toolbarDensity
    });
    this.reset();
  }
  setPageNumber(pageNumber, pageLabel) {
    this.pageNumber = pageNumber;
    this.pageLabel = pageLabel;
    __privateMethod(this, _Toolbar_instances, updateUIState_fn4).call(this, false);
  }
  setPagesCount(pagesCount, hasPageLabels) {
    this.pagesCount = pagesCount;
    this.hasPageLabels = hasPageLabels;
    __privateMethod(this, _Toolbar_instances, updateUIState_fn4).call(this, true);
  }
  setPageScale(pageScaleValue, pageScale) {
    this.pageScaleValue = (pageScaleValue || pageScale).toString();
    this.pageScale = pageScale;
    __privateMethod(this, _Toolbar_instances, updateUIState_fn4).call(this, false);
  }
  reset() {
    this.pageNumber = 0;
    this.pageLabel = null;
    this.hasPageLabels = false;
    this.pagesCount = 0;
    this.pageScaleValue = DEFAULT_SCALE_VALUE;
    this.pageScale = DEFAULT_SCALE;
    __privateMethod(this, _Toolbar_instances, updateUIState_fn4).call(this, true);
    this.updateLoadingIndicatorState();
    __privateMethod(this, _Toolbar_instances, editorModeChanged_fn).call(this, {
      mode: AnnotationEditorType.DISABLE
    });
  }
  updateLoadingIndicatorState(loading = false) {
    const {
      pageNumber
    } = __privateGet(this, _opts3);
    pageNumber.classList.toggle("loading", loading);
  }
}
_opts3 = new WeakMap();
_Toolbar_instances = new WeakSet();
updateToolbarDensity_fn = function({
  value
}) {
  let name = "normal";
  switch (value) {
    case 1:
      name = "compact";
      break;
    case 2:
      name = "touch";
      break;
  }
  document.documentElement.setAttribute("data-toolbar-density", name);
};
setAnnotationEditorUIManager_fn = function(uiManager, parentContainer) {
  const colorPicker = new ColorPicker({
    uiManager
  });
  uiManager.setMainHighlightColorPicker(colorPicker);
  parentContainer.append(colorPicker.renderMainDropdown());
};
bindListeners_fn3 = function(buttons) {
  const {
    eventBus
  } = this;
  const {
    editorHighlightColorPicker,
    editorHighlightButton,
    pageNumber,
    scaleSelect
  } = __privateGet(this, _opts3);
  const self = this;
  for (const {
    element,
    eventName,
    eventDetails,
    telemetry
  } of buttons) {
    element.addEventListener("click", (evt) => {
      if (eventName !== null) {
        eventBus.dispatch(eventName, {
          source: this,
          ...eventDetails,
          isFromKeyboard: evt.detail === 0
        });
      }
      if (telemetry) {
        eventBus.dispatch("reporttelemetry", {
          source: this,
          details: telemetry
        });
      }
    });
  }
  pageNumber.addEventListener("click", function() {
    this.select();
  });
  pageNumber.addEventListener("change", function() {
    eventBus.dispatch("pagenumberchanged", {
      source: self,
      value: this.value
    });
  });
  scaleSelect.addEventListener("change", function() {
    if (this.value === "custom") {
      return;
    }
    eventBus.dispatch("scalechanged", {
      source: self,
      value: this.value
    });
  });
  scaleSelect.addEventListener("click", function({
    target
  }) {
    if (this.value === self.pageScaleValue && target.tagName.toUpperCase() === "OPTION") {
      this.blur();
    }
  });
  scaleSelect.oncontextmenu = noContextMenu;
  eventBus._on("annotationeditormodechanged", __privateMethod(this, _Toolbar_instances, editorModeChanged_fn).bind(this));
  eventBus._on("showannotationeditorui", ({
    mode
  }) => {
    switch (mode) {
      case AnnotationEditorType.HIGHLIGHT:
        editorHighlightButton.click();
        break;
    }
  });
  eventBus._on("toolbardensity", __privateMethod(this, _Toolbar_instances, updateToolbarDensity_fn).bind(this));
  if (editorHighlightColorPicker) {
    eventBus._on("annotationeditoruimanager", ({
      uiManager
    }) => {
      __privateMethod(this, _Toolbar_instances, setAnnotationEditorUIManager_fn).call(this, uiManager, editorHighlightColorPicker);
    }, {
      once: true
    });
  }
};
editorModeChanged_fn = function({
  mode
}) {
  const {
    editorFreeTextButton,
    editorFreeTextParamsToolbar,
    editorHighlightButton,
    editorHighlightParamsToolbar,
    editorInkButton,
    editorInkParamsToolbar,
    editorStampButton,
    editorStampParamsToolbar
  } = __privateGet(this, _opts3);
  toggleExpandedBtn(editorFreeTextButton, mode === AnnotationEditorType.FREETEXT, editorFreeTextParamsToolbar);
  toggleExpandedBtn(editorHighlightButton, mode === AnnotationEditorType.HIGHLIGHT, editorHighlightParamsToolbar);
  toggleExpandedBtn(editorInkButton, mode === AnnotationEditorType.INK, editorInkParamsToolbar);
  toggleExpandedBtn(editorStampButton, mode === AnnotationEditorType.STAMP, editorStampParamsToolbar);
  const isDisable = mode === AnnotationEditorType.DISABLE;
  editorFreeTextButton.disabled = isDisable;
  editorHighlightButton.disabled = isDisable;
  editorInkButton.disabled = isDisable;
  editorStampButton.disabled = isDisable;
};
updateUIState_fn4 = function(resetNumPages = false) {
  const {
    pageNumber,
    pagesCount,
    pageScaleValue,
    pageScale
  } = this;
  const opts = __privateGet(this, _opts3);
  if (resetNumPages) {
    if (this.hasPageLabels) {
      opts.pageNumber.type = "text";
      opts.numPages.setAttribute("data-l10n-id", "pdfjs-page-of-pages");
    } else {
      opts.pageNumber.type = "number";
      opts.numPages.setAttribute("data-l10n-id", "pdfjs-of-pages");
      opts.numPages.setAttribute("data-l10n-args", JSON.stringify({
        pagesCount
      }));
    }
    opts.pageNumber.max = pagesCount;
  }
  if (this.hasPageLabels) {
    opts.pageNumber.value = this.pageLabel;
    opts.numPages.setAttribute("data-l10n-args", JSON.stringify({
      pageNumber,
      pagesCount
    }));
  } else {
    opts.pageNumber.value = pageNumber;
  }
  opts.previous.disabled = pageNumber <= 1;
  opts.next.disabled = pageNumber >= pagesCount;
  opts.zoomOut.disabled = pageScale <= MIN_SCALE;
  opts.zoomIn.disabled = pageScale >= MAX_SCALE;
  let predefinedValueFound = false;
  for (const option of opts.scaleSelect.options) {
    if (option.value !== pageScaleValue) {
      option.selected = false;
      continue;
    }
    option.selected = true;
    predefinedValueFound = true;
  }
  if (!predefinedValueFound) {
    opts.customScaleOption.selected = true;
    opts.customScaleOption.setAttribute("data-l10n-args", JSON.stringify({
      scale: Math.round(pageScale * 1e4) / 100
    }));
  }
};
;
const DEFAULT_VIEW_HISTORY_CACHE_SIZE = 20;
class ViewHistory {
  constructor(fingerprint, cacheSize = DEFAULT_VIEW_HISTORY_CACHE_SIZE) {
    this.fingerprint = fingerprint;
    this.cacheSize = cacheSize;
    this._initializedPromise = this._readFromStorage().then((databaseStr) => {
      const database = JSON.parse(databaseStr || "{}");
      let index = -1;
      if (!Array.isArray(database.files)) {
        database.files = [];
      } else {
        while (database.files.length >= this.cacheSize) {
          database.files.shift();
        }
        for (let i = 0, ii = database.files.length; i < ii; i++) {
          const branch = database.files[i];
          if (branch.fingerprint === this.fingerprint) {
            index = i;
            break;
          }
        }
      }
      if (index === -1) {
        index = database.files.push({
          fingerprint: this.fingerprint
        }) - 1;
      }
      this.file = database.files[index];
      this.database = database;
    });
  }
  async _writeToStorage() {
    const databaseStr = JSON.stringify(this.database);
    localStorage.setItem("pdfjs.history", databaseStr);
  }
  async _readFromStorage() {
    return localStorage.getItem("pdfjs.history");
  }
  async set(name, val) {
    await this._initializedPromise;
    this.file[name] = val;
    return this._writeToStorage();
  }
  async setMultiple(properties) {
    await this._initializedPromise;
    for (const name in properties) {
      this.file[name] = properties[name];
    }
    return this._writeToStorage();
  }
  async get(name, defaultValue) {
    await this._initializedPromise;
    const val = this.file[name];
    return val !== void 0 ? val : defaultValue;
  }
  async getMultiple(properties) {
    await this._initializedPromise;
    const values2 = /* @__PURE__ */ Object.create(null);
    for (const name in properties) {
      const val = this.file[name];
      values2[name] = val !== void 0 ? val : properties[name];
    }
    return values2;
  }
}
;
const FORCE_PAGES_LOADED_TIMEOUT = 1e4;
const ViewOnLoad = {
  UNKNOWN: -1,
  PREVIOUS: 0,
  INITIAL: 1
};
const PDFViewerApplication = {
  initialBookmark: document.location.hash.substring(1),
  _initializedCapability: {
    ...Promise.withResolvers(),
    settled: false
  },
  appConfig: null,
  pdfDocument: null,
  pdfLoadingTask: null,
  printService: null,
  pdfViewer: null,
  pdfThumbnailViewer: null,
  pdfRenderingQueue: null,
  pdfPresentationMode: null,
  pdfDocumentProperties: null,
  pdfLinkService: null,
  pdfHistory: null,
  pdfSidebar: null,
  pdfOutlineViewer: null,
  pdfAttachmentViewer: null,
  pdfLayerViewer: null,
  pdfCursorTools: null,
  pdfScriptingManager: null,
  store: null,
  downloadManager: null,
  overlayManager: null,
  preferences: new Preferences(),
  toolbar: null,
  secondaryToolbar: null,
  eventBus: null,
  l10n: null,
  annotationEditorParams: null,
  imageAltTextSettings: null,
  isInitialViewSet: false,
  isViewerEmbedded: window.parent !== window,
  url: "",
  baseUrl: "",
  mlManager: null,
  _downloadUrl: "",
  _eventBusAbortController: null,
  _windowAbortController: null,
  _globalAbortController: new AbortController(),
  documentInfo: null,
  metadata: null,
  _contentDispositionFilename: null,
  _contentLength: null,
  _saveInProgress: false,
  _wheelUnusedTicks: 0,
  _wheelUnusedFactor: 1,
  _touchManager: null,
  _touchUnusedTicks: 0,
  _touchUnusedFactor: 1,
  _PDFBug: null,
  _hasAnnotationEditors: false,
  _title: document.title,
  _printAnnotationStoragePromise: null,
  _isCtrlKeyDown: false,
  _caretBrowsing: null,
  _isScrolling: false,
  editorUndoBar: null,
  async initialize(appConfig) {
    this.appConfig = appConfig;
    try {
      await this.preferences.initializedPromise;
    } catch (ex) {
      console.error("initialize:", ex);
    }
    if (AppOptions.get("pdfBugEnabled")) {
      await this._parseHashParams();
    }
    let mode;
    switch (AppOptions.get("viewerCssTheme")) {
      case 1:
        mode = "is-light";
        break;
      case 2:
        mode = "is-dark";
        break;
    }
    if (mode) {
      document.documentElement.classList.add(mode);
    }
    this.l10n = await this.externalServices.createL10n();
    document.getElementsByTagName("html")[0].dir = this.l10n.getDirection();
    this.l10n.translate(appConfig.appContainer || document.documentElement);
    if (this.isViewerEmbedded && AppOptions.get("externalLinkTarget") === LinkTarget.NONE) {
      AppOptions.set("externalLinkTarget", LinkTarget.TOP);
    }
    await this._initializeViewerComponents();
    this.bindEvents();
    this.bindWindowEvents();
    this._initializedCapability.settled = true;
    this._initializedCapability.resolve();
  },
  async _parseHashParams() {
    const hash = document.location.hash.substring(1);
    if (!hash) {
      return;
    }
    const {
      mainContainer,
      viewerContainer
    } = this.appConfig, params = parseQueryString(hash);
    if (params.get("disableworker") === "true") {
      try {
        GlobalWorkerOptions.workerSrc || (GlobalWorkerOptions.workerSrc = AppOptions.get("workerSrc"));
        await import("../build/pdf.worker.mjs");
      } catch (ex) {
        console.error("_parseHashParams:", ex);
      }
    }
    if (params.has("textlayer")) {
      switch (params.get("textlayer")) {
        case "off":
          AppOptions.set("textLayerMode", TextLayerMode.DISABLE);
          break;
        case "visible":
        case "shadow":
        case "hover":
          viewerContainer.classList.add(`textLayer-${params.get("textlayer")}`);
          break;
      }
    }
    if (params.has("locale")) {
      AppOptions.set("localeProperties", {
        lang: params.get("locale")
      });
    }
    const opts = {
      disableAutoFetch: (x) => x === "true",
      disableFontFace: (x) => x === "true",
      disableHistory: (x) => x === "true",
      disableRange: (x) => x === "true",
      disableStream: (x) => x === "true",
      verbosity: (x) => x | 0
    };
    for (const name in opts) {
      const check = opts[name], key = name.toLowerCase();
      if (params.has(key)) {
        AppOptions.set(name, check(params.get(key)));
      }
    }
  },
  async _initializeViewerComponents() {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const {
      appConfig,
      externalServices,
      l10n
    } = this;
    const eventBus = new EventBus();
    this.eventBus = AppOptions.eventBus = eventBus;
    (_a2 = this.mlManager) == null ? void 0 : _a2.setEventBus(eventBus, this._globalAbortController.signal);
    this.overlayManager = new OverlayManager();
    const pdfRenderingQueue = new PDFRenderingQueue();
    pdfRenderingQueue.onIdle = this._cleanup.bind(this);
    this.pdfRenderingQueue = pdfRenderingQueue;
    const pdfLinkService = new PDFLinkService({
      eventBus,
      externalLinkTarget: AppOptions.get("externalLinkTarget"),
      externalLinkRel: AppOptions.get("externalLinkRel"),
      ignoreDestinationZoom: AppOptions.get("ignoreDestinationZoom")
    });
    this.pdfLinkService = pdfLinkService;
    const downloadManager = this.downloadManager = new DownloadManager();
    const findController = new PDFFindController({
      linkService: pdfLinkService,
      eventBus,
      updateMatchesCountOnProgress: true
    });
    this.findController = findController;
    const pdfScriptingManager = new PDFScriptingManager({
      eventBus,
      externalServices,
      docProperties: this._scriptingDocProperties.bind(this)
    });
    this.pdfScriptingManager = pdfScriptingManager;
    const container = appConfig.mainContainer, viewer = appConfig.viewerContainer;
    const annotationEditorMode = AppOptions.get("annotationEditorMode");
    const pageColors = AppOptions.get("forcePageColors") || window.matchMedia("(forced-colors: active)").matches ? {
      background: AppOptions.get("pageColorsBackground"),
      foreground: AppOptions.get("pageColorsForeground")
    } : null;
    let altTextManager;
    if (AppOptions.get("enableUpdatedAddImage")) {
      altTextManager = appConfig.newAltTextDialog ? new NewAltTextManager(appConfig.newAltTextDialog, this.overlayManager, eventBus) : null;
    } else {
      altTextManager = appConfig.altTextDialog ? new AltTextManager(appConfig.altTextDialog, container, this.overlayManager, eventBus) : null;
    }
    if (appConfig.editorUndoBar) {
      this.editorUndoBar = new EditorUndoBar(appConfig.editorUndoBar, eventBus);
    }
    const enableHWA = AppOptions.get("enableHWA");
    const pdfViewer = new PDFViewer({
      container,
      viewer,
      eventBus,
      renderingQueue: pdfRenderingQueue,
      linkService: pdfLinkService,
      downloadManager,
      altTextManager,
      editorUndoBar: this.editorUndoBar,
      findController,
      scriptingManager: AppOptions.get("enableScripting") && pdfScriptingManager,
      l10n,
      textLayerMode: AppOptions.get("textLayerMode"),
      annotationMode: AppOptions.get("annotationMode"),
      annotationEditorMode,
      annotationEditorHighlightColors: AppOptions.get("highlightEditorColors"),
      enableHighlightFloatingButton: AppOptions.get("enableHighlightFloatingButton"),
      enableUpdatedAddImage: AppOptions.get("enableUpdatedAddImage"),
      enableNewAltTextWhenAddingImage: AppOptions.get("enableNewAltTextWhenAddingImage"),
      imageResourcesPath: AppOptions.get("imageResourcesPath"),
      enablePrintAutoRotate: AppOptions.get("enablePrintAutoRotate"),
      maxCanvasPixels: AppOptions.get("maxCanvasPixels"),
      enablePermissions: AppOptions.get("enablePermissions"),
      pageColors,
      mlManager: this.mlManager,
      abortSignal: this._globalAbortController.signal,
      enableHWA,
      supportsPinchToZoom: this.supportsPinchToZoom
    });
    this.pdfViewer = pdfViewer;
    pdfRenderingQueue.setViewer(pdfViewer);
    pdfLinkService.setViewer(pdfViewer);
    pdfScriptingManager.setViewer(pdfViewer);
    if ((_b = appConfig.sidebar) == null ? void 0 : _b.thumbnailView) {
      this.pdfThumbnailViewer = new PDFThumbnailViewer({
        container: appConfig.sidebar.thumbnailView,
        eventBus,
        renderingQueue: pdfRenderingQueue,
        linkService: pdfLinkService,
        pageColors,
        abortSignal: this._globalAbortController.signal,
        enableHWA
      });
      pdfRenderingQueue.setThumbnailViewer(this.pdfThumbnailViewer);
    }
    if (!this.isViewerEmbedded && !AppOptions.get("disableHistory")) {
      this.pdfHistory = new PDFHistory({
        linkService: pdfLinkService,
        eventBus
      });
      pdfLinkService.setHistory(this.pdfHistory);
    }
    if (!this.supportsIntegratedFind && appConfig.findBar) {
      this.findBar = new PDFFindBar(appConfig.findBar, appConfig.principalContainer, eventBus);
    }
    if (appConfig.annotationEditorParams) {
      if (typeof AbortSignal.any === "function" && annotationEditorMode !== AnnotationEditorType.DISABLE) {
        this.annotationEditorParams = new AnnotationEditorParams(appConfig.annotationEditorParams, eventBus);
      } else {
        for (const id of ["editorModeButtons", "editorModeSeparator"]) {
          (_c = document.getElementById(id)) == null ? void 0 : _c.classList.add("hidden");
        }
      }
    }
    if (this.mlManager && ((_d = appConfig.secondaryToolbar) == null ? void 0 : _d.imageAltTextSettingsButton)) {
      this.imageAltTextSettings = new ImageAltTextSettings(appConfig.altTextSettingsDialog, this.overlayManager, eventBus, this.mlManager);
    }
    if (appConfig.documentProperties) {
      this.pdfDocumentProperties = new PDFDocumentProperties(appConfig.documentProperties, this.overlayManager, eventBus, l10n, () => this._docFilename);
    }
    if ((_e = appConfig.secondaryToolbar) == null ? void 0 : _e.cursorHandToolButton) {
      this.pdfCursorTools = new PDFCursorTools({
        container,
        eventBus,
        cursorToolOnLoad: AppOptions.get("cursorToolOnLoad")
      });
    }
    if (appConfig.toolbar) {
      this.toolbar = new Toolbar(appConfig.toolbar, eventBus, AppOptions.get("toolbarDensity"));
    }
    if (appConfig.secondaryToolbar) {
      if (AppOptions.get("enableAltText")) {
        (_f = appConfig.secondaryToolbar.imageAltTextSettingsButton) == null ? void 0 : _f.classList.remove("hidden");
        (_g = appConfig.secondaryToolbar.imageAltTextSettingsSeparator) == null ? void 0 : _g.classList.remove("hidden");
      }
      this.secondaryToolbar = new SecondaryToolbar(appConfig.secondaryToolbar, eventBus);
    }
    if (this.supportsFullscreen && ((_h = appConfig.secondaryToolbar) == null ? void 0 : _h.presentationModeButton)) {
      this.pdfPresentationMode = new PDFPresentationMode({
        container,
        pdfViewer,
        eventBus
      });
    }
    if (appConfig.passwordOverlay) {
      this.passwordPrompt = new PasswordPrompt(appConfig.passwordOverlay, this.overlayManager, this.isViewerEmbedded);
    }
    if ((_i = appConfig.sidebar) == null ? void 0 : _i.outlineView) {
      this.pdfOutlineViewer = new PDFOutlineViewer({
        container: appConfig.sidebar.outlineView,
        eventBus,
        l10n,
        linkService: pdfLinkService,
        downloadManager
      });
    }
    if ((_j = appConfig.sidebar) == null ? void 0 : _j.attachmentsView) {
      this.pdfAttachmentViewer = new PDFAttachmentViewer({
        container: appConfig.sidebar.attachmentsView,
        eventBus,
        l10n,
        downloadManager
      });
    }
    if ((_k = appConfig.sidebar) == null ? void 0 : _k.layersView) {
      this.pdfLayerViewer = new PDFLayerViewer({
        container: appConfig.sidebar.layersView,
        eventBus,
        l10n
      });
    }
    if (appConfig.sidebar) {
      this.pdfSidebar = new PDFSidebar({
        elements: appConfig.sidebar,
        eventBus,
        l10n
      });
      this.pdfSidebar.onToggled = this.forceRendering.bind(this);
      this.pdfSidebar.onUpdateThumbnails = () => {
        var _a3;
        for (const pageView of pdfViewer.getCachedPageViews()) {
          if (pageView.renderingState === RenderingStates.FINISHED) {
            (_a3 = this.pdfThumbnailViewer.getThumbnail(pageView.id - 1)) == null ? void 0 : _a3.setImage(pageView);
          }
        }
        this.pdfThumbnailViewer.scrollThumbnailIntoView(pdfViewer.currentPageNumber);
      };
    }
  },
  async run(config) {
    var _a2, _b, _c, _d, _e, _f, _g;
    await this.initialize(config);
    const {
      appConfig,
      eventBus
    } = this;
    let file;
    const queryString = document.location.search.substring(1);
    const params = parseQueryString(queryString);
    file = (_a2 = params.get("file")) != null ? _a2 : AppOptions.get("defaultUrl");
    validateFileURL(file);
    const fileInput = this._openFileInput = document.createElement("input");
    fileInput.id = "fileInput";
    fileInput.hidden = true;
    fileInput.type = "file";
    fileInput.value = null;
    document.body.append(fileInput);
    fileInput.addEventListener("change", function(evt) {
      const {
        files
      } = evt.target;
      if (!files || files.length === 0) {
        return;
      }
      eventBus.dispatch("fileinputchange", {
        source: this,
        fileInput: evt.target
      });
    });
    appConfig.mainContainer.addEventListener("dragover", function(evt) {
      for (const item of evt.dataTransfer.items) {
        if (item.type === "application/pdf") {
          evt.dataTransfer.dropEffect = evt.dataTransfer.effectAllowed === "copy" ? "copy" : "move";
          stopEvent(evt);
          return;
        }
      }
    });
    appConfig.mainContainer.addEventListener("drop", function(evt) {
      var _a3;
      if (((_a3 = evt.dataTransfer.files) == null ? void 0 : _a3[0].type) !== "application/pdf") {
        return;
      }
      stopEvent(evt);
      eventBus.dispatch("fileinputchange", {
        source: this,
        fileInput: evt.dataTransfer
      });
    });
    if (!AppOptions.get("supportsDocumentFonts")) {
      AppOptions.set("disableFontFace", true);
      this.l10n.get("pdfjs-web-fonts-disabled").then((msg) => {
        console.warn(msg);
      });
    }
    if (!this.supportsPrinting) {
      (_c = (_b = appConfig.toolbar) == null ? void 0 : _b.print) == null ? void 0 : _c.classList.add("hidden");
      (_d = appConfig.secondaryToolbar) == null ? void 0 : _d.printButton.classList.add("hidden");
    }
    if (!this.supportsFullscreen) {
      (_e = appConfig.secondaryToolbar) == null ? void 0 : _e.presentationModeButton.classList.add("hidden");
    }
    if (this.supportsIntegratedFind) {
      (_g = (_f = appConfig.findBar) == null ? void 0 : _f.toggleButton) == null ? void 0 : _g.classList.add("hidden");
    }
    if (file) {
      this.open({
        url: file
      });
    } else {
      this._hideViewBookmark();
    }
  },
  get externalServices() {
    return shadow(this, "externalServices", new ExternalServices());
  },
  get initialized() {
    return this._initializedCapability.settled;
  },
  get initializedPromise() {
    return this._initializedCapability.promise;
  },
  updateZoom(steps, scaleFactor, origin) {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }
    this.pdfViewer.updateScale({
      drawingDelay: AppOptions.get("defaultZoomDelay"),
      steps,
      scaleFactor,
      origin
    });
  },
  zoomIn() {
    this.updateZoom(1);
  },
  zoomOut() {
    this.updateZoom(-1);
  },
  zoomReset() {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }
    this.pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
  },
  touchPinchCallback(origin, prevDistance, distance) {
    if (this.supportsPinchToZoom) {
      const newScaleFactor = this._accumulateFactor(this.pdfViewer.currentScale, distance / prevDistance, "_touchUnusedFactor");
      this.updateZoom(null, newScaleFactor, origin);
    } else {
      const PIXELS_PER_LINE_SCALE = 30;
      const ticks = this._accumulateTicks((distance - prevDistance) / PIXELS_PER_LINE_SCALE, "_touchUnusedTicks");
      this.updateZoom(ticks, null, origin);
    }
  },
  touchPinchEndCallback() {
    this._touchUnusedTicks = 0;
    this._touchUnusedFactor = 1;
  },
  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  },
  get page() {
    return this.pdfViewer.currentPageNumber;
  },
  set page(val) {
    this.pdfViewer.currentPageNumber = val;
  },
  get supportsPrinting() {
    return PDFPrintServiceFactory.supportsPrinting;
  },
  get supportsFullscreen() {
    return shadow(this, "supportsFullscreen", document.fullscreenEnabled);
  },
  get supportsPinchToZoom() {
    return shadow(this, "supportsPinchToZoom", AppOptions.get("supportsPinchToZoom"));
  },
  get supportsIntegratedFind() {
    return shadow(this, "supportsIntegratedFind", AppOptions.get("supportsIntegratedFind"));
  },
  get loadingBar() {
    const barElement = document.getElementById("loadingBar");
    const bar = barElement ? new ProgressBar(barElement) : null;
    return shadow(this, "loadingBar", bar);
  },
  get supportsMouseWheelZoomCtrlKey() {
    return shadow(this, "supportsMouseWheelZoomCtrlKey", AppOptions.get("supportsMouseWheelZoomCtrlKey"));
  },
  get supportsMouseWheelZoomMetaKey() {
    return shadow(this, "supportsMouseWheelZoomMetaKey", AppOptions.get("supportsMouseWheelZoomMetaKey"));
  },
  get supportsCaretBrowsingMode() {
    return AppOptions.get("supportsCaretBrowsingMode");
  },
  moveCaret(isUp, select) {
    var _a2;
    this._caretBrowsing || (this._caretBrowsing = new CaretBrowsingMode(this._globalAbortController.signal, this.appConfig.mainContainer, this.appConfig.viewerContainer, (_a2 = this.appConfig.toolbar) == null ? void 0 : _a2.container));
    this._caretBrowsing.moveCaret(isUp, select);
  },
  setTitleUsingUrl(url = "", downloadUrl = null) {
    this.url = url;
    this.baseUrl = url.split("#", 1)[0];
    if (downloadUrl) {
      this._downloadUrl = downloadUrl === url ? this.baseUrl : downloadUrl.split("#", 1)[0];
    }
    if (isDataScheme(url)) {
      this._hideViewBookmark();
    }
    let title = pdfjs_getPdfFilenameFromUrl(url, "");
    if (!title) {
      try {
        title = decodeURIComponent(getFilenameFromUrl(url));
      } catch {
      }
    }
    this.setTitle(title || url);
  },
  setTitle(title = this._title) {
    this._title = title;
    if (this.isViewerEmbedded) {
      return;
    }
    const editorIndicator = this._hasAnnotationEditors && !this.pdfRenderingQueue.printing;
    document.title = `${editorIndicator ? "* " : ""}${title}`;
  },
  get _docFilename() {
    return this._contentDispositionFilename || pdfjs_getPdfFilenameFromUrl(this.url);
  },
  _hideViewBookmark() {
    var _a2;
    const {
      secondaryToolbar
    } = this.appConfig;
    secondaryToolbar == null ? void 0 : secondaryToolbar.viewBookmarkButton.classList.add("hidden");
    if (secondaryToolbar == null ? void 0 : secondaryToolbar.presentationModeButton.classList.contains("hidden")) {
      (_a2 = document.getElementById("viewBookmarkSeparator")) == null ? void 0 : _a2.classList.add("hidden");
    }
  },
  async close() {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    this._unblockDocumentLoadEvent();
    this._hideViewBookmark();
    if (!this.pdfLoadingTask) {
      return;
    }
    if (((_a2 = this.pdfDocument) == null ? void 0 : _a2.annotationStorage.size) > 0 && this._annotationStorageModified) {
      try {
        await this.save();
      } catch {
      }
    }
    const promises = [];
    promises.push(this.pdfLoadingTask.destroy());
    this.pdfLoadingTask = null;
    if (this.pdfDocument) {
      this.pdfDocument = null;
      (_b = this.pdfThumbnailViewer) == null ? void 0 : _b.setDocument(null);
      this.pdfViewer.setDocument(null);
      this.pdfLinkService.setDocument(null);
      (_c = this.pdfDocumentProperties) == null ? void 0 : _c.setDocument(null);
    }
    this.pdfLinkService.externalLinkEnabled = true;
    this.store = null;
    this.isInitialViewSet = false;
    this.url = "";
    this.baseUrl = "";
    this._downloadUrl = "";
    this.documentInfo = null;
    this.metadata = null;
    this._contentDispositionFilename = null;
    this._contentLength = null;
    this._saveInProgress = false;
    this._hasAnnotationEditors = false;
    promises.push(this.pdfScriptingManager.destroyPromise, this.passwordPrompt.close());
    this.setTitle();
    (_d = this.pdfSidebar) == null ? void 0 : _d.reset();
    (_e = this.pdfOutlineViewer) == null ? void 0 : _e.reset();
    (_f = this.pdfAttachmentViewer) == null ? void 0 : _f.reset();
    (_g = this.pdfLayerViewer) == null ? void 0 : _g.reset();
    (_h = this.pdfHistory) == null ? void 0 : _h.reset();
    (_i = this.findBar) == null ? void 0 : _i.reset();
    (_j = this.toolbar) == null ? void 0 : _j.reset();
    (_k = this.secondaryToolbar) == null ? void 0 : _k.reset();
    (_l = this._PDFBug) == null ? void 0 : _l.cleanup();
    await Promise.all(promises);
  },
  async open(args) {
    if (this.pdfLoadingTask) {
      await this.close();
    }
    const workerParams = AppOptions.getAll(OptionKind.WORKER);
    Object.assign(GlobalWorkerOptions, workerParams);
    if (args.url) {
      this.setTitleUsingUrl(args.originalUrl || args.url, args.url);
    }
    const apiParams = AppOptions.getAll(OptionKind.API);
    const loadingTask = getDocument({
      ...apiParams,
      ...args
    });
    this.pdfLoadingTask = loadingTask;
    loadingTask.onPassword = (updateCallback, reason) => {
      if (this.isViewerEmbedded) {
        this._unblockDocumentLoadEvent();
      }
      this.pdfLinkService.externalLinkEnabled = false;
      this.passwordPrompt.setUpdateCallback(updateCallback, reason);
      this.passwordPrompt.open();
    };
    loadingTask.onProgress = ({
      loaded,
      total
    }) => {
      this.progress(loaded / total);
    };
    return loadingTask.promise.then((pdfDocument) => {
      this.load(pdfDocument);
    }, (reason) => {
      if (loadingTask !== this.pdfLoadingTask) {
        return void 0;
      }
      let key = "pdfjs-loading-error";
      if (reason instanceof InvalidPDFException) {
        key = "pdfjs-invalid-file-error";
      } else if (reason instanceof MissingPDFException) {
        key = "pdfjs-missing-file-error";
      } else if (reason instanceof UnexpectedResponseException) {
        key = "pdfjs-unexpected-response-error";
      }
      return this._documentError(key, {
        message: reason.message
      }).then(() => {
        throw reason;
      });
    });
  },
  async download() {
    let data;
    try {
      data = await this.pdfDocument.getData();
    } catch {
    }
    this.downloadManager.download(data, this._downloadUrl, this._docFilename);
  },
  async save() {
    var _a2;
    if (this._saveInProgress) {
      return;
    }
    this._saveInProgress = true;
    await this.pdfScriptingManager.dispatchWillSave();
    try {
      const data = await this.pdfDocument.saveDocument();
      this.downloadManager.download(data, this._downloadUrl, this._docFilename);
    } catch (reason) {
      console.error(`Error when saving the document:`, reason);
      await this.download();
    } finally {
      await this.pdfScriptingManager.dispatchDidSave();
      this._saveInProgress = false;
    }
    if (this._hasAnnotationEditors) {
      this.externalServices.reportTelemetry({
        type: "editing",
        data: {
          type: "save",
          stats: (_a2 = this.pdfDocument) == null ? void 0 : _a2.annotationStorage.editorStats
        }
      });
    }
  },
  async downloadOrSave() {
    var _a2;
    const {
      classList
    } = this.appConfig.appContainer;
    classList.add("wait");
    await (((_a2 = this.pdfDocument) == null ? void 0 : _a2.annotationStorage.size) > 0 ? this.save() : this.download());
    classList.remove("wait");
  },
  async _documentError(key, moreInfo = null) {
    var _a2;
    this._unblockDocumentLoadEvent();
    const message = await this._otherError(key || "pdfjs-loading-error", moreInfo);
    this.eventBus.dispatch("documenterror", {
      source: this,
      message,
      reason: (_a2 = moreInfo == null ? void 0 : moreInfo.message) != null ? _a2 : null
    });
  },
  async _otherError(key, moreInfo = null) {
    const message = await this.l10n.get(key);
    const moreInfoText = [`PDF.js v${version || "?"} (build: ${build || "?"})`];
    if (moreInfo) {
      moreInfoText.push(`Message: ${moreInfo.message}`);
      if (moreInfo.stack) {
        moreInfoText.push(`Stack: ${moreInfo.stack}`);
      } else {
        if (moreInfo.filename) {
          moreInfoText.push(`File: ${moreInfo.filename}`);
        }
        if (moreInfo.lineNumber) {
          moreInfoText.push(`Line: ${moreInfo.lineNumber}`);
        }
      }
    }
    console.error(`${message}

${moreInfoText.join("\n")}`);
    return message;
  },
  progress(level) {
    var _a2, _b;
    const percent = Math.round(level * 100);
    if (!this.loadingBar || percent <= this.loadingBar.percent) {
      return;
    }
    this.loadingBar.percent = percent;
    if ((_b = (_a2 = this.pdfDocument) == null ? void 0 : _a2.loadingParams.disableAutoFetch) != null ? _b : AppOptions.get("disableAutoFetch")) {
      this.loadingBar.setDisableAutoFetch();
    }
  },
  load(pdfDocument) {
    var _a2, _b, _c, _d;
    this.pdfDocument = pdfDocument;
    pdfDocument.getDownloadInfo().then(({
      length
    }) => {
      var _a3;
      this._contentLength = length;
      (_a3 = this.loadingBar) == null ? void 0 : _a3.hide();
      firstPagePromise.then(() => {
        this.eventBus.dispatch("documentloaded", {
          source: this
        });
      });
    });
    const pageLayoutPromise = pdfDocument.getPageLayout().catch(() => {
    });
    const pageModePromise = pdfDocument.getPageMode().catch(() => {
    });
    const openActionPromise = pdfDocument.getOpenAction().catch(() => {
    });
    (_a2 = this.toolbar) == null ? void 0 : _a2.setPagesCount(pdfDocument.numPages, false);
    (_b = this.secondaryToolbar) == null ? void 0 : _b.setPagesCount(pdfDocument.numPages);
    this.pdfLinkService.setDocument(pdfDocument);
    (_c = this.pdfDocumentProperties) == null ? void 0 : _c.setDocument(pdfDocument);
    const pdfViewer = this.pdfViewer;
    pdfViewer.setDocument(pdfDocument);
    const {
      firstPagePromise,
      onePageRendered,
      pagesPromise
    } = pdfViewer;
    (_d = this.pdfThumbnailViewer) == null ? void 0 : _d.setDocument(pdfDocument);
    const storedPromise = (this.store = new ViewHistory(pdfDocument.fingerprints[0])).getMultiple({
      page: null,
      zoom: DEFAULT_SCALE_VALUE,
      scrollLeft: "0",
      scrollTop: "0",
      rotation: null,
      sidebarView: SidebarView.UNKNOWN,
      scrollMode: ScrollMode.UNKNOWN,
      spreadMode: SpreadMode.UNKNOWN
    }).catch(() => {
    });
    firstPagePromise.then((pdfPage) => {
      var _a3;
      (_a3 = this.loadingBar) == null ? void 0 : _a3.setWidth(this.appConfig.viewerContainer);
      this._initializeAnnotationStorageCallbacks(pdfDocument);
      Promise.all([animationStarted, storedPromise, pageLayoutPromise, pageModePromise, openActionPromise]).then(async ([timeStamp, stored, pageLayout, pageMode, openAction]) => {
        const viewOnLoad = AppOptions.get("viewOnLoad");
        this._initializePdfHistory({
          fingerprint: pdfDocument.fingerprints[0],
          viewOnLoad,
          initialDest: openAction == null ? void 0 : openAction.dest
        });
        const initialBookmark = this.initialBookmark;
        const zoom = AppOptions.get("defaultZoomValue");
        let hash = zoom ? `zoom=${zoom}` : null;
        let rotation = null;
        let sidebarView = AppOptions.get("sidebarViewOnLoad");
        let scrollMode = AppOptions.get("scrollModeOnLoad");
        let spreadMode = AppOptions.get("spreadModeOnLoad");
        if ((stored == null ? void 0 : stored.page) && viewOnLoad !== ViewOnLoad.INITIAL) {
          hash = `page=${stored.page}&zoom=${zoom || stored.zoom},${stored.scrollLeft},${stored.scrollTop}`;
          rotation = parseInt(stored.rotation, 10);
          if (sidebarView === SidebarView.UNKNOWN) {
            sidebarView = stored.sidebarView | 0;
          }
          if (scrollMode === ScrollMode.UNKNOWN) {
            scrollMode = stored.scrollMode | 0;
          }
          if (spreadMode === SpreadMode.UNKNOWN) {
            spreadMode = stored.spreadMode | 0;
          }
        }
        if (pageMode && sidebarView === SidebarView.UNKNOWN) {
          sidebarView = apiPageModeToSidebarView(pageMode);
        }
        if (pageLayout && scrollMode === ScrollMode.UNKNOWN && spreadMode === SpreadMode.UNKNOWN) {
          const modes = apiPageLayoutToViewerModes(pageLayout);
          spreadMode = modes.spreadMode;
        }
        this.setInitialView(hash, {
          rotation,
          sidebarView,
          scrollMode,
          spreadMode
        });
        this.eventBus.dispatch("documentinit", {
          source: this
        });
        if (!this.isViewerEmbedded) {
          pdfViewer.focus();
        }
        await Promise.race([pagesPromise, new Promise((resolve) => {
          setTimeout(resolve, FORCE_PAGES_LOADED_TIMEOUT);
        })]);
        if (!initialBookmark && !hash) {
          return;
        }
        if (pdfViewer.hasEqualPageSizes) {
          return;
        }
        this.initialBookmark = initialBookmark;
        pdfViewer.currentScaleValue = pdfViewer.currentScaleValue;
        this.setInitialView(hash);
      }).catch(() => {
        this.setInitialView();
      }).then(function() {
        pdfViewer.update();
      });
    });
    pagesPromise.then(() => {
      this._unblockDocumentLoadEvent();
      this._initializeAutoPrint(pdfDocument, openActionPromise);
    }, (reason) => {
      this._documentError("pdfjs-loading-error", {
        message: reason.message
      });
    });
    onePageRendered.then((data) => {
      this.externalServices.reportTelemetry({
        type: "pageInfo",
        timestamp: data.timestamp
      });
      if (this.pdfOutlineViewer) {
        pdfDocument.getOutline().then((outline) => {
          if (pdfDocument !== this.pdfDocument) {
            return;
          }
          this.pdfOutlineViewer.render({
            outline,
            pdfDocument
          });
        });
      }
      if (this.pdfAttachmentViewer) {
        pdfDocument.getAttachments().then((attachments) => {
          if (pdfDocument !== this.pdfDocument) {
            return;
          }
          this.pdfAttachmentViewer.render({
            attachments
          });
        });
      }
      if (this.pdfLayerViewer) {
        pdfViewer.optionalContentConfigPromise.then((optionalContentConfig) => {
          if (pdfDocument !== this.pdfDocument) {
            return;
          }
          this.pdfLayerViewer.render({
            optionalContentConfig,
            pdfDocument
          });
        });
      }
    });
    this._initializePageLabels(pdfDocument);
    this._initializeMetadata(pdfDocument);
  },
  async _scriptingDocProperties(pdfDocument) {
    var _a2, _b;
    if (!this.documentInfo) {
      await new Promise((resolve) => {
        this.eventBus._on("metadataloaded", resolve, {
          once: true
        });
      });
      if (pdfDocument !== this.pdfDocument) {
        return null;
      }
    }
    if (!this._contentLength) {
      await new Promise((resolve) => {
        this.eventBus._on("documentloaded", resolve, {
          once: true
        });
      });
      if (pdfDocument !== this.pdfDocument) {
        return null;
      }
    }
    return {
      ...this.documentInfo,
      baseURL: this.baseUrl,
      filesize: this._contentLength,
      filename: this._docFilename,
      metadata: (_a2 = this.metadata) == null ? void 0 : _a2.getRaw(),
      authors: (_b = this.metadata) == null ? void 0 : _b.get("dc:creator"),
      numPages: this.pagesCount,
      URL: this.url
    };
  },
  async _initializeAutoPrint(pdfDocument, openActionPromise) {
    const [openAction, jsActions] = await Promise.all([openActionPromise, this.pdfViewer.enableScripting ? null : pdfDocument.getJSActions()]);
    if (pdfDocument !== this.pdfDocument) {
      return;
    }
    let triggerAutoPrint = (openAction == null ? void 0 : openAction.action) === "Print";
    if (jsActions) {
      console.warn("Warning: JavaScript support is not enabled");
      for (const name in jsActions) {
        if (triggerAutoPrint) {
          break;
        }
        switch (name) {
          case "WillClose":
          case "WillSave":
          case "DidSave":
          case "WillPrint":
          case "DidPrint":
            continue;
        }
        triggerAutoPrint = jsActions[name].some((js) => AutoPrintRegExp.test(js));
      }
    }
    if (triggerAutoPrint) {
      this.triggerPrinting();
    }
  },
  async _initializeMetadata(pdfDocument) {
    var _a2, _b;
    const {
      info,
      metadata,
      contentDispositionFilename,
      contentLength
    } = await pdfDocument.getMetadata();
    if (pdfDocument !== this.pdfDocument) {
      return;
    }
    this.documentInfo = info;
    this.metadata = metadata;
    (_a2 = this._contentDispositionFilename) != null ? _a2 : this._contentDispositionFilename = contentDispositionFilename;
    (_b = this._contentLength) != null ? _b : this._contentLength = contentLength;
    console.log(`PDF ${pdfDocument.fingerprints[0]} [${info.PDFFormatVersion} ${(info.Producer || "-").trim()} / ${(info.Creator || "-").trim()}] (PDF.js: ${version || "?"} [${build || "?"}])`);
    let pdfTitle = info.Title;
    const metadataTitle = metadata == null ? void 0 : metadata.get("dc:title");
    if (metadataTitle) {
      if (metadataTitle !== "Untitled" && !/[\uFFF0-\uFFFF]/g.test(metadataTitle)) {
        pdfTitle = metadataTitle;
      }
    }
    if (pdfTitle) {
      this.setTitle(`${pdfTitle} - ${this._contentDispositionFilename || this._title}`);
    } else if (this._contentDispositionFilename) {
      this.setTitle(this._contentDispositionFilename);
    }
    if (info.IsXFAPresent && !info.IsAcroFormPresent && !pdfDocument.isPureXfa) {
      if (pdfDocument.loadingParams.enableXfa) {
        console.warn("Warning: XFA Foreground documents are not supported");
      } else {
        console.warn("Warning: XFA support is not enabled");
      }
    } else if ((info.IsAcroFormPresent || info.IsXFAPresent) && !this.pdfViewer.renderForms) {
      console.warn("Warning: Interactive form support is not enabled");
    }
    if (info.IsSignaturesPresent) {
      console.warn("Warning: Digital signatures validation is not supported");
    }
    this.eventBus.dispatch("metadataloaded", {
      source: this
    });
  },
  async _initializePageLabels(pdfDocument) {
    const labels = await pdfDocument.getPageLabels();
    if (pdfDocument !== this.pdfDocument) {
      return;
    }
    if (!labels || AppOptions.get("disablePageLabels")) {
      return;
    }
    const numLabels = labels.length;
    let standardLabels = 0, emptyLabels = 0;
    for (let i = 0; i < numLabels; i++) {
      const label = labels[i];
      if (label === (i + 1).toString()) {
        standardLabels++;
      } else if (label === "") {
        emptyLabels++;
      } else {
        break;
      }
    }
    if (standardLabels >= numLabels || emptyLabels >= numLabels) {
      return;
    }
    const {
      pdfViewer,
      pdfThumbnailViewer,
      toolbar
    } = this;
    pdfViewer.setPageLabels(labels);
    pdfThumbnailViewer == null ? void 0 : pdfThumbnailViewer.setPageLabels(labels);
    toolbar == null ? void 0 : toolbar.setPagesCount(numLabels, true);
    toolbar == null ? void 0 : toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
  },
  _initializePdfHistory({
    fingerprint,
    viewOnLoad,
    initialDest = null
  }) {
    if (!this.pdfHistory) {
      return;
    }
    this.pdfHistory.initialize({
      fingerprint,
      resetHistory: viewOnLoad === ViewOnLoad.INITIAL,
      updateUrl: AppOptions.get("historyUpdateUrl")
    });
    if (this.pdfHistory.initialBookmark) {
      this.initialBookmark = this.pdfHistory.initialBookmark;
      this.initialRotation = this.pdfHistory.initialRotation;
    }
    if (initialDest && !this.initialBookmark && viewOnLoad === ViewOnLoad.UNKNOWN) {
      this.initialBookmark = JSON.stringify(initialDest);
      this.pdfHistory.push({
        explicitDest: initialDest,
        pageNumber: null
      });
    }
  },
  _initializeAnnotationStorageCallbacks(pdfDocument) {
    if (pdfDocument !== this.pdfDocument) {
      return;
    }
    const {
      annotationStorage
    } = pdfDocument;
    annotationStorage.onSetModified = () => {
      window.addEventListener("beforeunload", beforeUnload);
      this._annotationStorageModified = true;
    };
    annotationStorage.onResetModified = () => {
      window.removeEventListener("beforeunload", beforeUnload);
      delete this._annotationStorageModified;
    };
    annotationStorage.onAnnotationEditor = (typeStr) => {
      this._hasAnnotationEditors = !!typeStr;
      this.setTitle();
    };
  },
  setInitialView(storedHash, {
    rotation,
    sidebarView,
    scrollMode,
    spreadMode
  } = {}) {
    var _a2, _b, _c;
    const setRotation = (angle) => {
      if (isValidRotation(angle)) {
        this.pdfViewer.pagesRotation = angle;
      }
    };
    const setViewerModes = (scroll, spread) => {
      if (isValidScrollMode(scroll)) {
        this.pdfViewer.scrollMode = scroll;
      }
      if (isValidSpreadMode(spread)) {
        this.pdfViewer.spreadMode = spread;
      }
    };
    this.isInitialViewSet = true;
    (_a2 = this.pdfSidebar) == null ? void 0 : _a2.setInitialView(sidebarView);
    setViewerModes(scrollMode, spreadMode);
    if (this.initialBookmark) {
      setRotation(this.initialRotation);
      delete this.initialRotation;
      this.pdfLinkService.setHash(this.initialBookmark);
      this.initialBookmark = null;
    } else if (storedHash) {
      setRotation(rotation);
      this.pdfLinkService.setHash(storedHash);
    }
    (_b = this.toolbar) == null ? void 0 : _b.setPageNumber(this.pdfViewer.currentPageNumber, this.pdfViewer.currentPageLabel);
    (_c = this.secondaryToolbar) == null ? void 0 : _c.setPageNumber(this.pdfViewer.currentPageNumber);
    if (!this.pdfViewer.currentScaleValue) {
      this.pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
    }
  },
  _cleanup() {
    var _a2;
    if (!this.pdfDocument) {
      return;
    }
    this.pdfViewer.cleanup();
    (_a2 = this.pdfThumbnailViewer) == null ? void 0 : _a2.cleanup();
    this.pdfDocument.cleanup(AppOptions.get("fontExtraProperties"));
  },
  forceRendering() {
    var _a2;
    this.pdfRenderingQueue.printing = !!this.printService;
    this.pdfRenderingQueue.isThumbnailViewEnabled = ((_a2 = this.pdfSidebar) == null ? void 0 : _a2.visibleView) === SidebarView.THUMBS;
    this.pdfRenderingQueue.renderHighestPriority();
  },
  beforePrint() {
    var _a2;
    this._printAnnotationStoragePromise = this.pdfScriptingManager.dispatchWillPrint().catch(() => {
    }).then(() => {
      var _a3;
      return (_a3 = this.pdfDocument) == null ? void 0 : _a3.annotationStorage.print;
    });
    if (this.printService) {
      return;
    }
    if (!this.supportsPrinting) {
      this._otherError("pdfjs-printing-not-supported");
      return;
    }
    if (!this.pdfViewer.pageViewsReady) {
      this.l10n.get("pdfjs-printing-not-ready").then((msg) => {
        window.alert(msg);
      });
      return;
    }
    this.printService = PDFPrintServiceFactory.createPrintService({
      pdfDocument: this.pdfDocument,
      pagesOverview: this.pdfViewer.getPagesOverview(),
      printContainer: this.appConfig.printContainer,
      printResolution: AppOptions.get("printResolution"),
      printAnnotationStoragePromise: this._printAnnotationStoragePromise
    });
    this.forceRendering();
    this.setTitle();
    this.printService.layout();
    if (this._hasAnnotationEditors) {
      this.externalServices.reportTelemetry({
        type: "editing",
        data: {
          type: "print",
          stats: (_a2 = this.pdfDocument) == null ? void 0 : _a2.annotationStorage.editorStats
        }
      });
    }
  },
  afterPrint() {
    var _a2;
    if (this._printAnnotationStoragePromise) {
      this._printAnnotationStoragePromise.then(() => {
        this.pdfScriptingManager.dispatchDidPrint();
      });
      this._printAnnotationStoragePromise = null;
    }
    if (this.printService) {
      this.printService.destroy();
      this.printService = null;
      (_a2 = this.pdfDocument) == null ? void 0 : _a2.annotationStorage.resetModified();
    }
    this.forceRendering();
    this.setTitle();
  },
  rotatePages(delta) {
    this.pdfViewer.pagesRotation += delta;
  },
  requestPresentationMode() {
    var _a2;
    (_a2 = this.pdfPresentationMode) == null ? void 0 : _a2.request();
  },
  triggerPrinting() {
    if (this.supportsPrinting) {
      window.print();
    }
  },
  bindEvents() {
    if (this._eventBusAbortController) {
      return;
    }
    const ac = this._eventBusAbortController = new AbortController();
    const opts = {
      signal: ac.signal
    };
    const {
      eventBus,
      externalServices,
      pdfDocumentProperties,
      pdfViewer,
      preferences
    } = this;
    eventBus._on("resize", onResize.bind(this), opts);
    eventBus._on("hashchange", onHashchange.bind(this), opts);
    eventBus._on("beforeprint", this.beforePrint.bind(this), opts);
    eventBus._on("afterprint", this.afterPrint.bind(this), opts);
    eventBus._on("pagerender", onPageRender.bind(this), opts);
    eventBus._on("pagerendered", onPageRendered.bind(this), opts);
    eventBus._on("updateviewarea", onUpdateViewarea.bind(this), opts);
    eventBus._on("pagechanging", onPageChanging.bind(this), opts);
    eventBus._on("scalechanging", onScaleChanging.bind(this), opts);
    eventBus._on("rotationchanging", onRotationChanging.bind(this), opts);
    eventBus._on("sidebarviewchanged", onSidebarViewChanged.bind(this), opts);
    eventBus._on("pagemode", onPageMode.bind(this), opts);
    eventBus._on("namedaction", onNamedAction.bind(this), opts);
    eventBus._on("presentationmodechanged", (evt) => pdfViewer.presentationModeState = evt.state, opts);
    eventBus._on("presentationmode", this.requestPresentationMode.bind(this), opts);
    eventBus._on("switchannotationeditormode", (evt) => pdfViewer.annotationEditorMode = evt, opts);
    eventBus._on("print", this.triggerPrinting.bind(this), opts);
    eventBus._on("download", this.downloadOrSave.bind(this), opts);
    eventBus._on("firstpage", () => this.page = 1, opts);
    eventBus._on("lastpage", () => this.page = this.pagesCount, opts);
    eventBus._on("nextpage", () => pdfViewer.nextPage(), opts);
    eventBus._on("previouspage", () => pdfViewer.previousPage(), opts);
    eventBus._on("zoomin", this.zoomIn.bind(this), opts);
    eventBus._on("zoomout", this.zoomOut.bind(this), opts);
    eventBus._on("zoomreset", this.zoomReset.bind(this), opts);
    eventBus._on("pagenumberchanged", onPageNumberChanged.bind(this), opts);
    eventBus._on("scalechanged", (evt) => pdfViewer.currentScaleValue = evt.value, opts);
    eventBus._on("rotatecw", this.rotatePages.bind(this, 90), opts);
    eventBus._on("rotateccw", this.rotatePages.bind(this, -90), opts);
    eventBus._on("optionalcontentconfig", (evt) => pdfViewer.optionalContentConfigPromise = evt.promise, opts);
    eventBus._on("switchscrollmode", (evt) => pdfViewer.scrollMode = evt.mode, opts);
    eventBus._on("scrollmodechanged", onViewerModesChanged.bind(this, "scrollMode"), opts);
    eventBus._on("switchspreadmode", (evt) => pdfViewer.spreadMode = evt.mode, opts);
    eventBus._on("spreadmodechanged", onViewerModesChanged.bind(this, "spreadMode"), opts);
    eventBus._on("imagealttextsettings", onImageAltTextSettings.bind(this), opts);
    eventBus._on("documentproperties", () => pdfDocumentProperties == null ? void 0 : pdfDocumentProperties.open(), opts);
    eventBus._on("findfromurlhash", onFindFromUrlHash.bind(this), opts);
    eventBus._on("updatefindmatchescount", onUpdateFindMatchesCount.bind(this), opts);
    eventBus._on("updatefindcontrolstate", onUpdateFindControlState.bind(this), opts);
    eventBus._on("fileinputchange", onFileInputChange.bind(this), opts);
    eventBus._on("openfile", onOpenFile.bind(this), opts);
  },
  bindWindowEvents() {
    if (this._windowAbortController) {
      return;
    }
    this._windowAbortController = new AbortController();
    const {
      eventBus,
      appConfig: {
        mainContainer
      },
      pdfViewer,
      _windowAbortController: {
        signal
      }
    } = this;
    if (typeof AbortSignal.any === "function") {
      this._touchManager = new TouchManager({
        container: window,
        isPinchingDisabled: () => pdfViewer.isInPresentationMode,
        isPinchingStopped: () => {
          var _a2;
          return (_a2 = this.overlayManager) == null ? void 0 : _a2.active;
        },
        onPinching: this.touchPinchCallback.bind(this),
        onPinchEnd: this.touchPinchEndCallback.bind(this),
        signal
      });
    }
    function addWindowResolutionChange(evt = null) {
      if (evt) {
        pdfViewer.refresh();
      }
      const mediaQueryList = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
      mediaQueryList.addEventListener("change", addWindowResolutionChange, {
        once: true,
        signal
      });
    }
    addWindowResolutionChange();
    window.addEventListener("wheel", onWheel.bind(this), {
      passive: false,
      signal
    });
    window.addEventListener("click", onClick.bind(this), {
      signal
    });
    window.addEventListener("keydown", onKeyDown.bind(this), {
      signal
    });
    window.addEventListener("keyup", onKeyUp.bind(this), {
      signal
    });
    window.addEventListener("resize", () => eventBus.dispatch("resize", {
      source: window
    }), {
      signal
    });
    window.addEventListener("hashchange", () => {
      eventBus.dispatch("hashchange", {
        source: window,
        hash: document.location.hash.substring(1)
      });
    }, {
      signal
    });
    window.addEventListener("beforeprint", () => eventBus.dispatch("beforeprint", {
      source: window
    }), {
      signal
    });
    window.addEventListener("afterprint", () => eventBus.dispatch("afterprint", {
      source: window
    }), {
      signal
    });
    window.addEventListener("updatefromsandbox", (evt) => {
      eventBus.dispatch("updatefromsandbox", {
        source: window,
        detail: evt.detail
      });
    }, {
      signal
    });
    if (!("onscrollend" in document.documentElement)) {
      return;
    }
    ({
      scrollTop: this._lastScrollTop,
      scrollLeft: this._lastScrollLeft
    } = mainContainer);
    const scrollend = () => {
      ({
        scrollTop: this._lastScrollTop,
        scrollLeft: this._lastScrollLeft
      } = mainContainer);
      this._isScrolling = false;
      mainContainer.addEventListener("scroll", scroll, {
        passive: true,
        signal
      });
      mainContainer.removeEventListener("scrollend", scrollend);
      mainContainer.removeEventListener("blur", scrollend);
    };
    const scroll = () => {
      if (this._isCtrlKeyDown) {
        return;
      }
      if (this._lastScrollTop === mainContainer.scrollTop && this._lastScrollLeft === mainContainer.scrollLeft) {
        return;
      }
      mainContainer.removeEventListener("scroll", scroll);
      this._isScrolling = true;
      mainContainer.addEventListener("scrollend", scrollend, {
        signal
      });
      mainContainer.addEventListener("blur", scrollend, {
        signal
      });
    };
    mainContainer.addEventListener("scroll", scroll, {
      passive: true,
      signal
    });
  },
  unbindEvents() {
    var _a2;
    (_a2 = this._eventBusAbortController) == null ? void 0 : _a2.abort();
    this._eventBusAbortController = null;
  },
  unbindWindowEvents() {
    var _a2;
    (_a2 = this._windowAbortController) == null ? void 0 : _a2.abort();
    this._windowAbortController = null;
    this._touchManager = null;
  },
  async testingClose() {
    var _a2, _b, _c;
    this.unbindEvents();
    this.unbindWindowEvents();
    (_a2 = this._globalAbortController) == null ? void 0 : _a2.abort();
    this._globalAbortController = null;
    (_b = this.findBar) == null ? void 0 : _b.close();
    await Promise.all([(_c = this.l10n) == null ? void 0 : _c.destroy(), this.close()]);
  },
  _accumulateTicks(ticks, prop) {
    if (this[prop] > 0 && ticks < 0 || this[prop] < 0 && ticks > 0) {
      this[prop] = 0;
    }
    this[prop] += ticks;
    const wholeTicks = Math.trunc(this[prop]);
    this[prop] -= wholeTicks;
    return wholeTicks;
  },
  _accumulateFactor(previousScale, factor, prop) {
    if (factor === 1) {
      return 1;
    }
    if (this[prop] > 1 && factor < 1 || this[prop] < 1 && factor > 1) {
      this[prop] = 1;
    }
    const newFactor = Math.floor(previousScale * factor * this[prop] * 100) / (100 * previousScale);
    this[prop] = factor / newFactor;
    return newFactor;
  },
  _unblockDocumentLoadEvent() {
    var _a2;
    (_a2 = document.blockUnblockOnload) == null ? void 0 : _a2.call(document, false);
    this._unblockDocumentLoadEvent = () => {
    };
  },
  get scriptingReady() {
    return this.pdfScriptingManager.ready;
  }
};
initCom(PDFViewerApplication);
{
  PDFPrintServiceFactory.initGlobals(PDFViewerApplication);
}
{
  const HOSTED_VIEWER_ORIGINS = ["null", "http://mozilla.github.io", "https://mozilla.github.io"];
  var validateFileURL = function(file) {
    if (!file) {
      return;
    }
    try {
      const viewerOrigin = new URL(window.location.href).origin || "null";
      if (HOSTED_VIEWER_ORIGINS.includes(viewerOrigin)) {
        return;
      }
      const fileOrigin = new URL(file, window.location.href).origin;
      if (fileOrigin !== viewerOrigin) {
        throw new Error("file origin does not match viewer's");
      }
    } catch (ex) {
      PDFViewerApplication._documentError("pdfjs-loading-error", {
        message: ex.message
      });
      throw ex;
    }
  };
  var onFileInputChange = function(evt) {
    var _a2;
    if ((_a2 = this.pdfViewer) == null ? void 0 : _a2.isInPresentationMode) {
      return;
    }
    const file = evt.fileInput.files[0];
    this.open({
      url: URL.createObjectURL(file),
      originalUrl: file.name
    });
  };
  var onOpenFile = function(evt) {
    var _a2;
    (_a2 = this._openFileInput) == null ? void 0 : _a2.click();
  };
}
function onPageRender({
  pageNumber
}) {
  var _a2;
  if (pageNumber === this.page) {
    (_a2 = this.toolbar) == null ? void 0 : _a2.updateLoadingIndicatorState(true);
  }
}
function onPageRendered({
  pageNumber,
  error
}) {
  var _a2, _b, _c;
  if (pageNumber === this.page) {
    (_a2 = this.toolbar) == null ? void 0 : _a2.updateLoadingIndicatorState(false);
  }
  if (((_b = this.pdfSidebar) == null ? void 0 : _b.visibleView) === SidebarView.THUMBS) {
    const pageView = this.pdfViewer.getPageView(pageNumber - 1);
    const thumbnailView = (_c = this.pdfThumbnailViewer) == null ? void 0 : _c.getThumbnail(pageNumber - 1);
    if (pageView) {
      thumbnailView == null ? void 0 : thumbnailView.setImage(pageView);
    }
  }
  if (error) {
    this._otherError("pdfjs-rendering-error", error);
  }
}
function onPageMode({
  mode
}) {
  var _a2;
  let view;
  switch (mode) {
    case "thumbs":
      view = SidebarView.THUMBS;
      break;
    case "bookmarks":
    case "outline":
      view = SidebarView.OUTLINE;
      break;
    case "attachments":
      view = SidebarView.ATTACHMENTS;
      break;
    case "layers":
      view = SidebarView.LAYERS;
      break;
    case "none":
      view = SidebarView.NONE;
      break;
    default:
      console.error('Invalid "pagemode" hash parameter: ' + mode);
      return;
  }
  (_a2 = this.pdfSidebar) == null ? void 0 : _a2.switchView(view, true);
}
function onNamedAction(evt) {
  var _a2, _b;
  switch (evt.action) {
    case "GoToPage":
      (_a2 = this.appConfig.toolbar) == null ? void 0 : _a2.pageNumber.select();
      break;
    case "Find":
      if (!this.supportsIntegratedFind) {
        (_b = this.findBar) == null ? void 0 : _b.toggle();
      }
      break;
    case "Print":
      this.triggerPrinting();
      break;
    case "SaveAs":
      this.downloadOrSave();
      break;
  }
}
function onSidebarViewChanged({
  view
}) {
  var _a2;
  this.pdfRenderingQueue.isThumbnailViewEnabled = view === SidebarView.THUMBS;
  if (this.isInitialViewSet) {
    (_a2 = this.store) == null ? void 0 : _a2.set("sidebarView", view).catch(() => {
    });
  }
}
function onUpdateViewarea({
  location
}) {
  var _a2;
  if (this.isInitialViewSet) {
    (_a2 = this.store) == null ? void 0 : _a2.setMultiple({
      page: location.pageNumber,
      zoom: location.scale,
      scrollLeft: location.left,
      scrollTop: location.top,
      rotation: location.rotation
    }).catch(() => {
    });
  }
  if (this.appConfig.secondaryToolbar) {
    this.appConfig.secondaryToolbar.viewBookmarkButton.href = this.pdfLinkService.getAnchorUrl(location.pdfOpenParams);
  }
}
function onViewerModesChanged(name, evt) {
  var _a2;
  if (this.isInitialViewSet && !this.pdfViewer.isInPresentationMode) {
    (_a2 = this.store) == null ? void 0 : _a2.set(name, evt.mode).catch(() => {
    });
  }
}
function onResize() {
  const {
    pdfDocument,
    pdfViewer,
    pdfRenderingQueue
  } = this;
  if (pdfRenderingQueue.printing && window.matchMedia("print").matches) {
    return;
  }
  if (!pdfDocument) {
    return;
  }
  const currentScaleValue = pdfViewer.currentScaleValue;
  if (currentScaleValue === "auto" || currentScaleValue === "page-fit" || currentScaleValue === "page-width") {
    pdfViewer.currentScaleValue = currentScaleValue;
  }
  pdfViewer.update();
}
function onHashchange(evt) {
  var _a2;
  const hash = evt.hash;
  if (!hash) {
    return;
  }
  if (!this.isInitialViewSet) {
    this.initialBookmark = hash;
  } else if (!((_a2 = this.pdfHistory) == null ? void 0 : _a2.popStateInProgress)) {
    this.pdfLinkService.setHash(hash);
  }
}
function onPageNumberChanged(evt) {
  var _a2;
  const {
    pdfViewer
  } = this;
  if (evt.value !== "") {
    this.pdfLinkService.goToPage(evt.value);
  }
  if (evt.value !== pdfViewer.currentPageNumber.toString() && evt.value !== pdfViewer.currentPageLabel) {
    (_a2 = this.toolbar) == null ? void 0 : _a2.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
  }
}
function onImageAltTextSettings() {
  var _a2;
  (_a2 = this.imageAltTextSettings) == null ? void 0 : _a2.open({
    enableGuessAltText: AppOptions.get("enableGuessAltText"),
    enableNewAltTextWhenAddingImage: AppOptions.get("enableNewAltTextWhenAddingImage")
  });
}
function onFindFromUrlHash(evt) {
  this.eventBus.dispatch("find", {
    source: evt.source,
    type: "",
    query: evt.query,
    caseSensitive: false,
    entireWord: false,
    highlightAll: true,
    findPrevious: false,
    matchDiacritics: true
  });
}
function onUpdateFindMatchesCount({
  matchesCount
}) {
  var _a2;
  if (this.supportsIntegratedFind) {
    this.externalServices.updateFindMatchesCount(matchesCount);
  } else {
    (_a2 = this.findBar) == null ? void 0 : _a2.updateResultsCount(matchesCount);
  }
}
function onUpdateFindControlState({
  state,
  previous,
  entireWord,
  matchesCount,
  rawQuery
}) {
  var _a2;
  if (this.supportsIntegratedFind) {
    this.externalServices.updateFindControlState({
      result: state,
      findPrevious: previous,
      entireWord,
      matchesCount,
      rawQuery
    });
  } else {
    (_a2 = this.findBar) == null ? void 0 : _a2.updateUIState(state, previous, matchesCount);
  }
}
function onScaleChanging(evt) {
  var _a2;
  (_a2 = this.toolbar) == null ? void 0 : _a2.setPageScale(evt.presetValue, evt.scale);
  this.pdfViewer.update();
}
function onRotationChanging(evt) {
  if (this.pdfThumbnailViewer) {
    this.pdfThumbnailViewer.pagesRotation = evt.pagesRotation;
  }
  this.forceRendering();
  this.pdfViewer.currentPageNumber = evt.pageNumber;
}
function onPageChanging({
  pageNumber,
  pageLabel
}) {
  var _a2, _b, _c, _d, _e;
  (_a2 = this.toolbar) == null ? void 0 : _a2.setPageNumber(pageNumber, pageLabel);
  (_b = this.secondaryToolbar) == null ? void 0 : _b.setPageNumber(pageNumber);
  if (((_c = this.pdfSidebar) == null ? void 0 : _c.visibleView) === SidebarView.THUMBS) {
    (_d = this.pdfThumbnailViewer) == null ? void 0 : _d.scrollThumbnailIntoView(pageNumber);
  }
  const currentPage = this.pdfViewer.getPageView(pageNumber - 1);
  (_e = this.toolbar) == null ? void 0 : _e.updateLoadingIndicatorState((currentPage == null ? void 0 : currentPage.renderingState) === RenderingStates.RUNNING);
}
function onWheel(evt) {
  const {
    pdfViewer,
    supportsMouseWheelZoomCtrlKey,
    supportsMouseWheelZoomMetaKey,
    supportsPinchToZoom
  } = this;
  if (pdfViewer.isInPresentationMode) {
    return;
  }
  const deltaMode = evt.deltaMode;
  let scaleFactor = Math.exp(-evt.deltaY / 100);
  const isBuiltInMac = false;
  const isPinchToZoom = evt.ctrlKey && !this._isCtrlKeyDown && deltaMode === WheelEvent.DOM_DELTA_PIXEL && evt.deltaX === 0 && (Math.abs(scaleFactor - 1) < 0.05 || isBuiltInMac) && evt.deltaZ === 0;
  const origin = [evt.clientX, evt.clientY];
  if (isPinchToZoom || evt.ctrlKey && supportsMouseWheelZoomCtrlKey || evt.metaKey && supportsMouseWheelZoomMetaKey) {
    evt.preventDefault();
    if (this._isScrolling || document.visibilityState === "hidden" || this.overlayManager.active) {
      return;
    }
    if (isPinchToZoom && supportsPinchToZoom) {
      scaleFactor = this._accumulateFactor(pdfViewer.currentScale, scaleFactor, "_wheelUnusedFactor");
      this.updateZoom(null, scaleFactor, origin);
    } else {
      const delta = normalizeWheelEventDirection(evt);
      let ticks = 0;
      if (deltaMode === WheelEvent.DOM_DELTA_LINE || deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        ticks = Math.abs(delta) >= 1 ? Math.sign(delta) : this._accumulateTicks(delta, "_wheelUnusedTicks");
      } else {
        const PIXELS_PER_LINE_SCALE = 30;
        ticks = this._accumulateTicks(delta / PIXELS_PER_LINE_SCALE, "_wheelUnusedTicks");
      }
      this.updateZoom(ticks, null, origin);
    }
  }
}
function closeSecondaryToolbar(evt) {
  var _a2, _b, _c;
  if (!((_a2 = this.secondaryToolbar) == null ? void 0 : _a2.isOpen)) {
    return;
  }
  const appConfig = this.appConfig;
  if (this.pdfViewer.containsElement(evt.target) || ((_b = appConfig.toolbar) == null ? void 0 : _b.container.contains(evt.target)) && !((_c = appConfig.secondaryToolbar) == null ? void 0 : _c.toggleButton.contains(evt.target))) {
    this.secondaryToolbar.close();
  }
}
function closeEditorUndoBar(evt) {
  var _a2, _b;
  if (!((_a2 = this.editorUndoBar) == null ? void 0 : _a2.isOpen)) {
    return;
  }
  if ((_b = this.appConfig.secondaryToolbar) == null ? void 0 : _b.toolbar.contains(evt.target)) {
    this.editorUndoBar.hide();
  }
}
function onClick(evt) {
  closeSecondaryToolbar.call(this, evt);
  closeEditorUndoBar.call(this, evt);
}
function onKeyUp(evt) {
  if (evt.key === "Control") {
    this._isCtrlKeyDown = false;
  }
}
function onKeyDown(evt) {
  var _a2, _b, _c, _d, _e, _f, _g;
  this._isCtrlKeyDown = evt.key === "Control";
  if (((_a2 = this.editorUndoBar) == null ? void 0 : _a2.isOpen) && evt.keyCode !== 9 && evt.keyCode !== 16 && !((evt.keyCode === 13 || evt.keyCode === 32) && getActiveOrFocusedElement() === this.appConfig.editorUndoBar.undoButton)) {
    this.editorUndoBar.hide();
  }
  if (this.overlayManager.active) {
    return;
  }
  const {
    eventBus,
    pdfViewer
  } = this;
  const isViewerInPresentationMode = pdfViewer.isInPresentationMode;
  let handled = false, ensureViewerFocused = false;
  const cmd = (evt.ctrlKey ? 1 : 0) | (evt.altKey ? 2 : 0) | (evt.shiftKey ? 4 : 0) | (evt.metaKey ? 8 : 0);
  if (cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12) {
    switch (evt.keyCode) {
      case 70:
        if (!this.supportsIntegratedFind && !evt.shiftKey) {
          (_b = this.findBar) == null ? void 0 : _b.open();
          handled = true;
        }
        break;
      case 71:
        if (!this.supportsIntegratedFind) {
          const {
            state
          } = this.findController;
          if (state) {
            const newState = {
              source: window,
              type: "again",
              findPrevious: cmd === 5 || cmd === 12
            };
            eventBus.dispatch("find", {
              ...state,
              ...newState
            });
          }
          handled = true;
        }
        break;
      case 61:
      case 107:
      case 187:
      case 171:
        this.zoomIn();
        handled = true;
        break;
      case 173:
      case 109:
      case 189:
        this.zoomOut();
        handled = true;
        break;
      case 48:
      case 96:
        if (!isViewerInPresentationMode) {
          setTimeout(() => {
            this.zoomReset();
          });
          handled = false;
        }
        break;
      case 38:
        if (isViewerInPresentationMode || this.page > 1) {
          this.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }
        break;
      case 40:
        if (isViewerInPresentationMode || this.page < this.pagesCount) {
          this.page = this.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }
        break;
    }
  }
  if (cmd === 1 || cmd === 8) {
    switch (evt.keyCode) {
      case 83:
        eventBus.dispatch("download", {
          source: window
        });
        handled = true;
        break;
      case 79:
        {
          eventBus.dispatch("openfile", {
            source: window
          });
          handled = true;
        }
        break;
    }
  }
  if (cmd === 3 || cmd === 10) {
    switch (evt.keyCode) {
      case 80:
        this.requestPresentationMode();
        handled = true;
        this.externalServices.reportTelemetry({
          type: "buttons",
          data: {
            id: "presentationModeKeyboard"
          }
        });
        break;
      case 71:
        if (this.appConfig.toolbar) {
          this.appConfig.toolbar.pageNumber.select();
          handled = true;
        }
        break;
    }
  }
  if (handled) {
    if (ensureViewerFocused && !isViewerInPresentationMode) {
      pdfViewer.focus();
    }
    evt.preventDefault();
    return;
  }
  const curElement = getActiveOrFocusedElement();
  const curElementTagName = curElement == null ? void 0 : curElement.tagName.toUpperCase();
  if (curElementTagName === "INPUT" || curElementTagName === "TEXTAREA" || curElementTagName === "SELECT" || curElementTagName === "BUTTON" && (evt.keyCode === 13 || evt.keyCode === 32) || (curElement == null ? void 0 : curElement.isContentEditable)) {
    if (evt.keyCode !== 27) {
      return;
    }
  }
  if (cmd === 0) {
    let turnPage = 0, turnOnlyIfPageFit = false;
    switch (evt.keyCode) {
      case 38:
        if (this.supportsCaretBrowsingMode) {
          this.moveCaret(true, false);
          handled = true;
          break;
        }
      case 33:
        if (pdfViewer.isVerticalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }
        turnPage = -1;
        break;
      case 8:
        if (!isViewerInPresentationMode) {
          turnOnlyIfPageFit = true;
        }
        turnPage = -1;
        break;
      case 37:
        if (this.supportsCaretBrowsingMode) {
          return;
        }
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }
      case 75:
      case 80:
        turnPage = -1;
        break;
      case 27:
        if ((_c = this.secondaryToolbar) == null ? void 0 : _c.isOpen) {
          this.secondaryToolbar.close();
          handled = true;
        }
        if (!this.supportsIntegratedFind && ((_d = this.findBar) == null ? void 0 : _d.opened)) {
          this.findBar.close();
          handled = true;
        }
        break;
      case 40:
        if (this.supportsCaretBrowsingMode) {
          this.moveCaret(false, false);
          handled = true;
          break;
        }
      case 34:
        if (pdfViewer.isVerticalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }
        turnPage = 1;
        break;
      case 13:
      case 32:
        if (!isViewerInPresentationMode) {
          turnOnlyIfPageFit = true;
        }
        turnPage = 1;
        break;
      case 39:
        if (this.supportsCaretBrowsingMode) {
          return;
        }
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }
      case 74:
      case 78:
        turnPage = 1;
        break;
      case 36:
        if (isViewerInPresentationMode || this.page > 1) {
          this.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }
        break;
      case 35:
        if (isViewerInPresentationMode || this.page < this.pagesCount) {
          this.page = this.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }
        break;
      case 83:
        (_e = this.pdfCursorTools) == null ? void 0 : _e.switchTool(CursorTool.SELECT);
        break;
      case 72:
        (_f = this.pdfCursorTools) == null ? void 0 : _f.switchTool(CursorTool.HAND);
        break;
      case 82:
        this.rotatePages(90);
        break;
      case 115:
        (_g = this.pdfSidebar) == null ? void 0 : _g.toggle();
        break;
    }
    if (turnPage !== 0 && (!turnOnlyIfPageFit || pdfViewer.currentScaleValue === "page-fit")) {
      if (turnPage > 0) {
        pdfViewer.nextPage();
      } else {
        pdfViewer.previousPage();
      }
      handled = true;
    }
  }
  if (cmd === 4) {
    switch (evt.keyCode) {
      case 13:
      case 32:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== "page-fit") {
          break;
        }
        pdfViewer.previousPage();
        handled = true;
        break;
      case 38:
        this.moveCaret(true, true);
        handled = true;
        break;
      case 40:
        this.moveCaret(false, true);
        handled = true;
        break;
      case 82:
        this.rotatePages(-90);
        break;
    }
  }
  if (!handled && !isViewerInPresentationMode) {
    if (evt.keyCode >= 33 && evt.keyCode <= 40 || evt.keyCode === 32 && curElementTagName !== "BUTTON") {
      ensureViewerFocused = true;
    }
  }
  if (ensureViewerFocused && !pdfViewer.containsElement(curElement)) {
    pdfViewer.focus();
  }
  if (handled) {
    evt.preventDefault();
  }
}
function beforeUnload(evt) {
  evt.preventDefault();
  evt.returnValue = "";
  return false;
}
;
const pdfjsVersion = "4.10.38";
const pdfjsBuild = "f9bea397f";
const AppConstants = {
  LinkTarget,
  RenderingStates,
  ScrollMode,
  SpreadMode
};
window.PDFViewerApplication = PDFViewerApplication;
window.PDFViewerApplicationConstants = AppConstants;
window.PDFViewerApplicationOptions = AppOptions;
function getViewerConfiguration() {
  return {
    appContainer: document.body,
    principalContainer: document.getElementById("mainContainer"),
    mainContainer: document.getElementById("viewerContainer"),
    viewerContainer: document.getElementById("viewer"),
    toolbar: {
      container: document.getElementById("toolbarContainer"),
      numPages: document.getElementById("numPages"),
      pageNumber: document.getElementById("pageNumber"),
      scaleSelect: document.getElementById("scaleSelect"),
      customScaleOption: document.getElementById("customScaleOption"),
      previous: document.getElementById("previous"),
      next: document.getElementById("next"),
      zoomIn: document.getElementById("zoomInButton"),
      zoomOut: document.getElementById("zoomOutButton"),
      print: document.getElementById("printButton"),
      editorFreeTextButton: document.getElementById("editorFreeTextButton"),
      editorFreeTextParamsToolbar: document.getElementById("editorFreeTextParamsToolbar"),
      editorHighlightButton: document.getElementById("editorHighlightButton"),
      editorHighlightParamsToolbar: document.getElementById("editorHighlightParamsToolbar"),
      editorHighlightColorPicker: document.getElementById("editorHighlightColorPicker"),
      editorInkButton: document.getElementById("editorInkButton"),
      editorInkParamsToolbar: document.getElementById("editorInkParamsToolbar"),
      editorStampButton: document.getElementById("editorStampButton"),
      editorStampParamsToolbar: document.getElementById("editorStampParamsToolbar"),
      download: document.getElementById("downloadButton")
    },
    secondaryToolbar: {
      toolbar: document.getElementById("secondaryToolbar"),
      toggleButton: document.getElementById("secondaryToolbarToggleButton"),
      presentationModeButton: document.getElementById("presentationMode"),
      openFileButton: document.getElementById("secondaryOpenFile"),
      printButton: document.getElementById("secondaryPrint"),
      downloadButton: document.getElementById("secondaryDownload"),
      viewBookmarkButton: document.getElementById("viewBookmark"),
      firstPageButton: document.getElementById("firstPage"),
      lastPageButton: document.getElementById("lastPage"),
      pageRotateCwButton: document.getElementById("pageRotateCw"),
      pageRotateCcwButton: document.getElementById("pageRotateCcw"),
      cursorSelectToolButton: document.getElementById("cursorSelectTool"),
      cursorHandToolButton: document.getElementById("cursorHandTool"),
      scrollPageButton: document.getElementById("scrollPage"),
      scrollVerticalButton: document.getElementById("scrollVertical"),
      scrollHorizontalButton: document.getElementById("scrollHorizontal"),
      scrollWrappedButton: document.getElementById("scrollWrapped"),
      spreadNoneButton: document.getElementById("spreadNone"),
      spreadOddButton: document.getElementById("spreadOdd"),
      spreadEvenButton: document.getElementById("spreadEven"),
      imageAltTextSettingsButton: document.getElementById("imageAltTextSettings"),
      imageAltTextSettingsSeparator: document.getElementById("imageAltTextSettingsSeparator"),
      documentPropertiesButton: document.getElementById("documentProperties")
    },
    sidebar: {
      outerContainer: document.getElementById("outerContainer"),
      sidebarContainer: document.getElementById("sidebarContainer"),
      toggleButton: document.getElementById("sidebarToggleButton"),
      resizer: document.getElementById("sidebarResizer"),
      thumbnailButton: document.getElementById("viewThumbnail"),
      outlineButton: document.getElementById("viewOutline"),
      attachmentsButton: document.getElementById("viewAttachments"),
      layersButton: document.getElementById("viewLayers"),
      thumbnailView: document.getElementById("thumbnailView"),
      outlineView: document.getElementById("outlineView"),
      attachmentsView: document.getElementById("attachmentsView"),
      layersView: document.getElementById("layersView"),
      currentOutlineItemButton: document.getElementById("currentOutlineItem")
    },
    findBar: {
      bar: document.getElementById("findbar"),
      toggleButton: document.getElementById("viewFindButton"),
      findField: document.getElementById("findInput"),
      highlightAllCheckbox: document.getElementById("findHighlightAll"),
      caseSensitiveCheckbox: document.getElementById("findMatchCase"),
      matchDiacriticsCheckbox: document.getElementById("findMatchDiacritics"),
      entireWordCheckbox: document.getElementById("findEntireWord"),
      findMsg: document.getElementById("findMsg"),
      findResultsCount: document.getElementById("findResultsCount"),
      findPreviousButton: document.getElementById("findPreviousButton"),
      findNextButton: document.getElementById("findNextButton")
    },
    passwordOverlay: {
      dialog: document.getElementById("passwordDialog"),
      label: document.getElementById("passwordText"),
      input: document.getElementById("password"),
      submitButton: document.getElementById("passwordSubmit"),
      cancelButton: document.getElementById("passwordCancel")
    },
    documentProperties: {
      dialog: document.getElementById("documentPropertiesDialog"),
      closeButton: document.getElementById("documentPropertiesClose"),
      fields: {
        fileName: document.getElementById("fileNameField"),
        fileSize: document.getElementById("fileSizeField"),
        title: document.getElementById("titleField"),
        author: document.getElementById("authorField"),
        subject: document.getElementById("subjectField"),
        keywords: document.getElementById("keywordsField"),
        creationDate: document.getElementById("creationDateField"),
        modificationDate: document.getElementById("modificationDateField"),
        creator: document.getElementById("creatorField"),
        producer: document.getElementById("producerField"),
        version: document.getElementById("versionField"),
        pageCount: document.getElementById("pageCountField"),
        pageSize: document.getElementById("pageSizeField"),
        linearized: document.getElementById("linearizedField")
      }
    },
    altTextDialog: {
      dialog: document.getElementById("altTextDialog"),
      optionDescription: document.getElementById("descriptionButton"),
      optionDecorative: document.getElementById("decorativeButton"),
      textarea: document.getElementById("descriptionTextarea"),
      cancelButton: document.getElementById("altTextCancel"),
      saveButton: document.getElementById("altTextSave")
    },
    newAltTextDialog: {
      dialog: document.getElementById("newAltTextDialog"),
      title: document.getElementById("newAltTextTitle"),
      descriptionContainer: document.getElementById("newAltTextDescriptionContainer"),
      textarea: document.getElementById("newAltTextDescriptionTextarea"),
      disclaimer: document.getElementById("newAltTextDisclaimer"),
      learnMore: document.getElementById("newAltTextLearnMore"),
      imagePreview: document.getElementById("newAltTextImagePreview"),
      createAutomatically: document.getElementById("newAltTextCreateAutomatically"),
      createAutomaticallyButton: document.getElementById("newAltTextCreateAutomaticallyButton"),
      downloadModel: document.getElementById("newAltTextDownloadModel"),
      downloadModelDescription: document.getElementById("newAltTextDownloadModelDescription"),
      error: document.getElementById("newAltTextError"),
      errorCloseButton: document.getElementById("newAltTextCloseButton"),
      cancelButton: document.getElementById("newAltTextCancel"),
      notNowButton: document.getElementById("newAltTextNotNow"),
      saveButton: document.getElementById("newAltTextSave")
    },
    altTextSettingsDialog: {
      dialog: document.getElementById("altTextSettingsDialog"),
      createModelButton: document.getElementById("createModelButton"),
      aiModelSettings: document.getElementById("aiModelSettings"),
      learnMore: document.getElementById("altTextSettingsLearnMore"),
      deleteModelButton: document.getElementById("deleteModelButton"),
      downloadModelButton: document.getElementById("downloadModelButton"),
      showAltTextDialogButton: document.getElementById("showAltTextDialogButton"),
      altTextSettingsCloseButton: document.getElementById("altTextSettingsCloseButton"),
      closeButton: document.getElementById("altTextSettingsCloseButton")
    },
    annotationEditorParams: {
      editorFreeTextFontSize: document.getElementById("editorFreeTextFontSize"),
      editorFreeTextColor: document.getElementById("editorFreeTextColor"),
      editorInkColor: document.getElementById("editorInkColor"),
      editorInkThickness: document.getElementById("editorInkThickness"),
      editorInkOpacity: document.getElementById("editorInkOpacity"),
      editorStampAddImage: document.getElementById("editorStampAddImage"),
      editorFreeHighlightThickness: document.getElementById("editorFreeHighlightThickness"),
      editorHighlightShowAll: document.getElementById("editorHighlightShowAll")
    },
    printContainer: document.getElementById("printContainer"),
    editorUndoBar: {
      container: document.getElementById("editorUndoBar"),
      message: document.getElementById("editorUndoBarMessage"),
      undoButton: document.getElementById("editorUndoBarUndoButton"),
      closeButton: document.getElementById("editorUndoBarCloseButton")
    }
  };
}
function webViewerLoad() {
  const config = getViewerConfiguration();
  const event = new CustomEvent("webviewerloaded", {
    bubbles: true,
    cancelable: true,
    detail: {
      source: window
    }
  });
  try {
    parent.document.dispatchEvent(event);
  } catch (ex) {
    console.error("webviewerloaded:", ex);
    document.dispatchEvent(event);
  }
  PDFViewerApplication.run(config);
}
(_a = document.blockUnblockOnload) == null ? void 0 : _a.call(document, true);
if (document.readyState === "interactive" || document.readyState === "complete") {
  webViewerLoad();
} else {
  document.addEventListener("DOMContentLoaded", webViewerLoad, true);
}
var __webpack_exports__PDFViewerApplication = __webpack_exports__.PDFViewerApplication;
var __webpack_exports__PDFViewerApplicationConstants = __webpack_exports__.PDFViewerApplicationConstants;
var __webpack_exports__PDFViewerApplicationOptions = __webpack_exports__.PDFViewerApplicationOptions;
export {
  __webpack_exports__PDFViewerApplication as PDFViewerApplication,
  __webpack_exports__PDFViewerApplicationConstants as PDFViewerApplicationConstants,
  __webpack_exports__PDFViewerApplicationOptions as PDFViewerApplicationOptions
};
