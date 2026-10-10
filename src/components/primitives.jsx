import React from 'react';
import { brand } from '../site.config.js';

/**
 * Small shared pieces. Deliberately tiny: the page's character comes from
 * typography and composition, not from a component library.
 */

/** The single arrow mark used across the site, inline so no icon package is needed. */
export function Arrow({ direction = 'right' }) {
  const rotation = { right: 0, down: 90, upRight: -45 }[direction] ?? 0;
  return (
    <svg
      className="link__arrow"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
      focusable="false"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M1 7h11.2M8 2.8 12.4 7 8 11.2" />
    </svg>
  );
}

/** Tracked uppercase micro-label with its champagne rule. */
export function Label({
  children,
  light = false,
  plain = false,
  className = '',
  as: Tag = 'p'
}) {
  const classes = ['label', light && 'label--light', plain && 'label--plain', className]
    .filter(Boolean)
    .join(' ');
  return <Tag className={classes}>{children}</Tag>;
}

/** Typographic wordmark. No seal, medallion or icon logo. */
export function Wordmark({ className = '' }) {
  return (
    <span className={`wordmark ${className}`.trim()}>
      <span className="wordmark__top">{brand.wordmarkTop}</span>
      <span className="wordmark__bottom">{brand.wordmarkBottom}</span>
    </span>
  );
}

/** Text action with a rule under it. Renders as <a> or <button>. */
export function ActionLink({ href, onClick, children, light = false, ...rest }) {
  const className = `link ${light ? 'link--light' : ''}`.trim();
  const content = (
    <>
      <span>{children}</span>
      <Arrow />
    </>
  );

  if (href) {
    return (
      <a className={className} href={href} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={className} type="button" onClick={onClick} {...rest}>
      {content}
    </button>
  );
}

/**
 * A photograph with its crop, responsive sources and explicit dimensions.
 * width/height are always passed through so the browser reserves the space
 * and the page does not shift while images load.
 */
export function Figure({ media, sizes, className = '', priority = false, caption }) {
  return (
    <figure className={className}>
      <div className="frame">
        <img
          src={media.src}
          srcSet={media.srcSet}
          sizes={sizes}
          width={media.width}
          height={media.height}
          alt={media.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchpriority={priority ? 'high' : 'auto'}
        />
      </div>
      {caption ? <figcaption className="caption">{caption}</figcaption> : null}
    </figure>
  );
}
