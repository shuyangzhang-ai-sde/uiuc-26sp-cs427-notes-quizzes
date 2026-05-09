/**
 * Shared Coursera-style quiz: render cards, option buttons, score, reset.
 * Each page defines `questions` and calls QuizPane.mount({ ... }).
 *
 * Quiz chrome markup + styles: see `quiz-pane.css` (top-of-file comment has the HTML template).
 */
(function (global) {
  'use strict';

  var EXPL_STYLE_ID = 'quiz-pane-explanation-styles-v2';

  function ensureQuizPaneStyles() {
    if (document.getElementById(EXPL_STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = EXPL_STYLE_ID;
    style.textContent = [
      '.qz-opt-correct{background:var(--qz-correct-bg,var(--accent-light,#edf4ef))!important;color:var(--qz-correct-text,var(--accent,#3d6b4f))!important;}',
      '.qz-explanation.qz-explanation-correct{background:var(--qz-correct-bg,var(--accent-light,#edf4ef))!important;}',
      '.qz-explanation.qz-explanation-correct .qz-expl-title{color:var(--qz-correct-text,var(--accent,#3d6b4f))!important;}',
      '.qz-explanation.qz-explanation-wrong{background:var(--blue-light,#ebf1fb)!important;}',
      '.qz-explanation.qz-explanation-wrong .qz-expl-title{color:var(--blue,#2d5fa6)!important;}',
      '.qz-explanation .qz-expl-list{margin:0!important;padding:0 0 0 1.35rem!important;}',
      '.qz-explanation .qz-expl-list li{padding:4px 0 4px 0.35rem!important;}',
    ].join('');
    document.head.appendChild(style);
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function defaultRenderPrompt(q, idx, esc, diagramMap) {
    var parts = [];
    parts.push('<div class="q-text">' + esc(q.text).replace(/\n/g, '<br>') + '</div>');
    if (q.figureSrc) {
      parts.push(
        '<div class="q-figure"><img src="' +
          esc(q.figureSrc) +
          '" alt="" loading="lazy"></div>'
      );
    }
    if (diagramMap && q.diagram && diagramMap[q.diagram]) {
      parts.push(
        '<div class="qz-diagram"><img src="' +
          esc(diagramMap[q.diagram]) +
          '" alt="Diagram" loading="lazy"></div>'
      );
    }
    if (q.code) {
      parts.push('<pre class="q-code"><code>' + esc(q.code) + '</code></pre>');
    }
    if (q.afterCode) {
      parts.push(
        '<div class="q-after-code">' +
          esc(q.afterCode).replace(/\n/g, '<br>') +
          '</div>'
      );
    }
    return parts.join('');
  }

  function defaultRenderExplanation(q, idx, esc) {
    var lines = q.explanations || q.expItems;
    if (lines && lines.length) {
      return (
        '<ul class="qz-expl-list">' +
        lines
          .map(function (line) {
            return '<li>' + esc(line) + '</li>';
          })
          .join('') +
        '</ul>'
      );
    }
    if (q.exp != null && q.exp !== '') {
      return '<div class="qz-expl-plain">' + esc(q.exp) + '</div>';
    }
    return '';
  }

  function optionIsCorrect(q, oi) {
    if (Array.isArray(q.correct)) return q.correct.indexOf(oi) >= 0;
    return oi === q.correct;
  }

  function preprocessQuestions(questions, expandExplanationToOptions) {
    if (!expandExplanationToOptions) return questions;
    return questions.map(function (q) {
      var hasList =
        (q.explanations && q.explanations.length) ||
        (q.expItems && q.expItems.length);
      if (hasList || q.exp == null) return q;
      return Object.assign({}, q, {
        explanations: q.options.map(function (opt, oi) {
          return optionIsCorrect(q, oi)
            ? '✅ ' + q.exp
            : '❌ ' + opt + ' — Incorrect.';
        }),
      });
    });
  }

  /**
   * @param {Object} config
   * @param {Array} config.questions - normalized question objects: text, options, correct; optional num, explanations|expItems, exp, code, figureSrc, diagram
   * @param {string} [config.containerId='questions-container']
   * @param {string} [config.scoreId='score-display']
   * @param {string} [config.idPrefix=''] - prefix for option/explanation element ids (required when multiple quizzes exist on one page)
   * @param {string} [config.resetGlobalName] - assign resetQuiz to global[resetGlobalName] instead of global.resetQuiz
   * @param {boolean} [config.noGlobalReset] - if true, do not assign global.resetQuiz (use with resetGlobalName or external handles)
   * @param {Object} [config.diagramMap] - map diagram key -> image URL (Week 5)
   * @param {boolean} [config.expandExplanationToOptions] - turn single `exp` into per-option list (Week 7)
   * @param {function(q, idx, escapeHtml): string} [config.renderPrompt]
   * @param {function(q, idx, escapeHtml): string} [config.renderExplanation]
   */
  function mount(config) {
    ensureQuizPaneStyles();
    var containerId = config.containerId || 'questions-container';
    var scoreId = config.scoreId || 'score-display';
    /** When mounting multiple quizzes on one page, set unique prefix so element ids do not collide. */
    var idPrefix = config.idPrefix || '';
    var diagramMap = config.diagramMap || null;
    var questions = preprocessQuestions(
      config.questions,
      config.expandExplanationToOptions
    );

    var renderPrompt =
      config.renderPrompt ||
      function (q, idx, esc) {
        return defaultRenderPrompt(q, idx, esc, diagramMap);
      };
    var renderExplanation =
      config.renderExplanation ||
      function (q, idx, esc) {
        return defaultRenderExplanation(q, idx, esc);
      };

    var answered = [];
    var correctCount = 0;

    function optElId(qIdx, oi) {
      return idPrefix + 'opt-' + qIdx + '-' + oi;
    }
    function explElId(qIdx) {
      return idPrefix + 'expl-' + qIdx;
    }

    function updateScore() {
      var total = answered.filter(Boolean).length;
      var n = questions.length;
      var el = document.getElementById(scoreId);
      if (el) {
        el.textContent =
          total === 0
            ? '— / ' + n
            : correctCount + ' / ' + total + ' answered';
      }
    }

    function selectOption(qIdx, optIdx) {
      if (answered[qIdx]) return;
      var q = questions[qIdx];
      if (Array.isArray(q.correct)) return;
      answered[qIdx] = true;
      var isCorrect = optIdx === q.correct;
      if (isCorrect) correctCount++;
      q.options.forEach(function (_, oi) {
        var btn = document.getElementById(optElId(qIdx, oi));
        if (!btn) return;
        btn.disabled = true;
        if (oi === optIdx && isCorrect) btn.className = 'qz-opt-correct';
        else if (oi === optIdx && !isCorrect) btn.className = 'qz-opt-wrong';
        else if (oi === q.correct && !isCorrect)
          btn.className = 'qz-opt-reveal';
        else btn.className = 'qz-opt-neutral';
      });
      var explEl = document.getElementById(explElId(qIdx));
      if (explEl) {
        explEl.style.display = 'block';
        explEl.classList.toggle('qz-explanation-correct', isCorrect);
        explEl.classList.toggle('qz-explanation-wrong', !isCorrect);
      }
      updateScore();
    }

    function setsEqualIndices(a, b) {
      if (a.length !== b.length) return false;
      var sa = a.slice().sort(function (x, y) {
        return x - y;
      });
      var sb = b.slice().sort(function (x, y) {
        return x - y;
      });
      for (var i = 0; i < sa.length; i++) if (sa[i] !== sb[i]) return false;
      return true;
    }

    function toggleMultiPick(qIdx, oi) {
      if (answered[qIdx]) return;
      var btn = document.getElementById(optElId(qIdx, oi));
      if (!btn || btn.disabled) return;
      btn.classList.toggle('qz-opt-picked');
    }

    function confirmMulti(qIdx) {
      if (answered[qIdx]) return;
      var q = questions[qIdx];
      var corr = q.correct;
      if (!Array.isArray(corr)) return;

      var picked = [];
      q.options.forEach(function (_, oi) {
        var btn = document.getElementById(optElId(qIdx, oi));
        if (btn && btn.classList.contains('qz-opt-picked')) picked.push(oi);
      });

      answered[qIdx] = true;
      var ok = setsEqualIndices(picked, corr);
      if (ok) correctCount++;

      q.options.forEach(function (_, oi) {
        var btn = document.getElementById(optElId(qIdx, oi));
        if (!btn) return;
        btn.disabled = true;
        btn.classList.remove('qz-opt-picked');
        var inCorr = corr.indexOf(oi) >= 0;
        var userPick = picked.indexOf(oi) >= 0;
        if (ok && inCorr) btn.className = 'qz-opt-correct';
        else if (!ok && userPick && !inCorr) btn.className = 'qz-opt-wrong';
        else if (!ok && !userPick && inCorr) btn.className = 'qz-opt-reveal';
        else if (!ok && userPick && inCorr) btn.className = 'qz-opt-correct';
        else btn.className = 'qz-opt-neutral';
      });

      var explEl = document.getElementById(explElId(qIdx));
      if (explEl) {
        explEl.style.display = 'block';
        explEl.classList.toggle('qz-explanation-correct', ok);
        explEl.classList.toggle('qz-explanation-wrong', !ok);
      }
      var checkBtn = document.getElementById(idPrefix + 'multi-check-' + qIdx);
      if (checkBtn) checkBtn.disabled = true;
      updateScore();
    }

    function revealAnswerKey(qIdx) {
      if (answered[qIdx]) return;
      var q = questions[qIdx];
      if (Array.isArray(q.correct)) {
        answered[qIdx] = true;
        correctCount++;
        var corr = q.correct;
        q.options.forEach(function (_, oi) {
          var btn = document.getElementById(optElId(qIdx, oi));
          if (!btn) return;
          btn.disabled = true;
          btn.classList.remove('qz-opt-picked');
          if (corr.indexOf(oi) >= 0) btn.className = 'qz-opt-correct';
          else btn.className = 'qz-opt-neutral';
        });
        var explEl = document.getElementById(explElId(qIdx));
        if (explEl) {
          explEl.style.display = 'block';
          explEl.classList.add('qz-explanation-correct');
          explEl.classList.remove('qz-explanation-wrong');
        }
        var checkBtn = document.getElementById(idPrefix + 'multi-check-' + qIdx);
        if (checkBtn) checkBtn.disabled = true;
        updateScore();
      } else {
        selectOption(qIdx, q.correct);
      }
    }

    function buildQuestions() {
      var container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = '';
      answered = new Array(questions.length).fill(false);
      correctCount = 0;

      questions.forEach(function (q, idx) {
        var card = document.createElement('div');
        card.className = 'q-card';
        var isMulti = Array.isArray(q.correct);
        var optsHTML = q.options
          .map(function (opt, oi) {
            return (
              '<button type="button" class="qz-opt' +
              (isMulti ? ' qz-opt-multi' : '') +
              '" id="' +
              optElId(idx, oi) +
              '" data-q="' +
              idx +
              '" data-o="' +
              oi +
              '">' +
              escapeHtml(opt) +
              '</button>'
            );
          })
          .join('');
        if (isMulti) {
          optsHTML +=
            '<div class="qz-multi-footer"><button type="button" class="qz-multi-check" id="' +
            idPrefix +
            'multi-check-' +
            idx +
            '" data-q="' +
            idx +
            '">Check answer</button></div>';
        }
        var explInner = renderExplanation(q, idx, escapeHtml);
        var explBlock = explInner
          ? '<div class="qz-explanation" id="' +
            explElId(idx) +
            '"><div class="qz-expl-title">Explanation</div>' +
            explInner +
            '</div>'
          : '';
        var num = q.num != null ? q.num : idx + 1;
        card.innerHTML =
          '<div class="q-num">Q' +
          num +
          '</div>' +
          renderPrompt(q, idx, escapeHtml) +
          '<div class="qz-options" id="opts-' +
          idx +
          '">' +
          optsHTML +
          '</div>' +
          explBlock;
        container.appendChild(card);
      });
      updateScore();
    }

    function resetQuiz() {
      buildQuestions();
    }

    var containerEl = document.getElementById(containerId);
    if (containerEl) {
      containerEl.addEventListener('click', function (e) {
        var checkBtn = e.target.closest('.qz-multi-check');
        if (checkBtn && !checkBtn.disabled) {
          var cq = parseInt(checkBtn.getAttribute('data-q'), 10);
          confirmMulti(cq);
          return;
        }
        var btn = e.target.closest('.qz-opt');
        if (!btn || btn.disabled) return;
        var qIdx = parseInt(btn.getAttribute('data-q'), 10);
        var oi = parseInt(btn.getAttribute('data-o'), 10);
        if (btn.id !== optElId(qIdx, oi)) return;
        var qq = questions[qIdx];
        if (Array.isArray(qq.correct)) toggleMultiPick(qIdx, oi);
        else selectOption(qIdx, oi);
      });
    }

    if (config.resetGlobalName && typeof config.resetGlobalName === 'string') {
      global[config.resetGlobalName] = resetQuiz;
    } else if (!config.noGlobalReset) {
      global.resetQuiz = resetQuiz;
    }
    buildQuestions();

    return {
      buildQuestions: buildQuestions,
      resetQuiz: resetQuiz,
      selectOption: selectOption,
      revealAnswerKey: revealAnswerKey,
      confirmMulti: confirmMulti,
    };
  }

  global.QuizPane = {
    mount: mount,
    escapeHtml: escapeHtml,
  };
})(typeof window !== 'undefined' ? window : this);
