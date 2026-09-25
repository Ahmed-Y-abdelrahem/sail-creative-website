import { cx } from "@/lib/utils";

export const Container = ({ as: Tag = "div", className = "", children, ...rest }) => (
  <Tag className={cx("px-[var(--pad)]", className)} {...rest}>
    {children}
  </Tag>
);

const tones = {
  night: "surface-night",
  deep: "bg-deep text-paper",
  light: "surface-light",
  paper: "surface-paper",
  none: "",
};

export const Section = ({ as: Tag = "section", tone = "night", className = "", children, ...rest }) => (
  <Tag className={cx("relative", tones[tone], className)} {...rest}>
    {children}
  </Tag>
);

/** Small technical index — encodes position in the story, not decoration. */
export const SectionLabel = ({ index, children, className = "" }) => (
  <p className={cx("meta flex items-center gap-3 opacity-70", className)}>
    {index != null && <span className="tabular-nums">{index}</span>}
    <span aria-hidden className="h-px w-10 bg-current opacity-60" />
    <span>{children}</span>
  </p>
);

export const SectionHeading = ({ as: Tag = "h2", size = "fs-xl", wide = false, className = "", children, ...rest }) => (
  <Tag className={cx("display", wide && "display-wide", size, className)} {...rest}>
    {children}
  </Tag>
);

export const DisplayText = ({ as: Tag = "p", size = "fs-lg", className = "", children, ...rest }) => (
  <Tag className={cx("display", size, className)} {...rest}>
    {children}
  </Tag>
);
