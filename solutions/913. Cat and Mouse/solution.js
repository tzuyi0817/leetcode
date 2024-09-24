/**
 * @param {number[][]} graph
 * @return {number}
 */
const catMouseGame = function (graph) {
  const DRAW = 0;
  const MOUSE_WIN = 1;
  const CAT_WIN = 2;

  const MOUSE_START = 1;
  const CAT_START = 2;

  const MOUSE_ROUND = 0;
  const CAT_ROUND = 1;

  const n = graph.length;
  const defaultState = { [MOUSE_ROUND]: DRAW, [CAT_ROUND]: DRAW };
  const defaultDegree = { [MOUSE_ROUND]: 0, [CAT_ROUND]: 0 };
  const states = Array(n)
    .fill('')
    .map(_ =>
      Array(n)
        .fill('')
        .map(_ => ({ ...defaultState })),
    );
  const outDegree = Array(n)
    .fill('')
    .map(_ =>
      Array(n)
        .fill('')
        .map(_ => ({ ...defaultDegree })),
    );
  let queue = [];

  for (let mouse = 0; mouse < n; mouse++) {
    for (let cat = 0; cat < n; cat++) {
      outDegree[mouse][cat][MOUSE_ROUND] = graph[mouse].length;
      outDegree[mouse][cat][CAT_ROUND] = graph[cat].filter(node => node).length;
    }
  }

  for (let cat = 1; cat < n; cat++) {
    states[0][cat][MOUSE_ROUND] = MOUSE_WIN;
    states[0][cat][CAT_ROUND] = MOUSE_WIN;
    states[cat][cat][MOUSE_ROUND] = CAT_WIN;
    states[cat][cat][CAT_ROUND] = CAT_WIN;

    queue.push({ mouse: 0, cat, round: MOUSE_ROUND, state: MOUSE_WIN });
    queue.push({ mouse: 0, cat, round: CAT_ROUND, state: MOUSE_WIN });
    queue.push({ mouse: cat, cat, round: MOUSE_ROUND, state: CAT_WIN });
    queue.push({ mouse: cat, cat, round: CAT_ROUND, state: CAT_WIN });
  }

  while (queue.length) {
    const nextQueue = [];

    for (const { mouse, cat, round, state } of queue) {
      if (mouse === MOUSE_START && cat === CAT_START && round === MOUSE_ROUND) {
        return state;
      }
      const prevRound = round === MOUSE_ROUND ? CAT_ROUND : MOUSE_ROUND;
      const isPrevMouseRound = prevRound === MOUSE_ROUND;
      const prevNodes = graph[isPrevMouseRound ? mouse : cat];

      for (const prevNode of prevNodes) {
        const prevCat = isPrevMouseRound ? cat : prevNode;

        if (prevCat === 0) continue;
        const prevMouse = isPrevMouseRound ? prevNode : mouse;

        if (states[prevMouse][prevCat][prevRound] !== DRAW) continue;
        const isMouseWin = isPrevMouseRound && state === MOUSE_WIN;
        const isCatWin = !isPrevMouseRound && state === CAT_WIN;

        if (isMouseWin || isCatWin || --outDegree[prevMouse][prevCat][prevRound] === 0) {
          states[prevMouse][prevCat][prevRound] = state;
          nextQueue.push({ mouse: prevMouse, cat: prevCat, round: prevRound, state });
        }
      }
    }
    queue = nextQueue;
  }
  return states[MOUSE_START][CAT_START][MOUSE_ROUND];
};
