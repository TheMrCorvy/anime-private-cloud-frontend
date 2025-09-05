import {
    mockNextImage,
    mockNextLink,
    mockNextServer,
    mockUseRouter,
} from "@/mocks/jestSetup";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => mockUseRouter);
jest.mock("next/image", () => mockNextImage);
jest.mock("next/server", () => mockNextServer);
jest.mock("next/link", () => mockNextLink);

// Mock NextUI ripple component to avoid animation issues in tests
jest.mock("@nextui-org/ripple", () => ({
    Ripple: ({ children }: { children: React.ReactNode }) => children,
    useRipple: () => {
        const rippleHandler = jest.fn();
        return {
            ripples: [],
            onClear: jest.fn(),
            onClick: rippleHandler,
            onMouseDown: jest.fn(),
            onMouseUp: jest.fn(),
            onMouseLeave: jest.fn(),
            onTouchStart: jest.fn(),
            onTouchEnd: jest.fn(),
            onTouchCancel: jest.fn(),
            onPress: rippleHandler,
        };
    },
}));

// Mock framer-motion to avoid dynamic import issues
jest.mock("framer-motion", () => {
    const React = require("react");
    const FakeTransition = ({ children }: { children: React.ReactNode }) =>
        children;
    const FakeAnimatePresence = ({ children }: { children: React.ReactNode }) =>
        React.Children.map(children, (child: any) => child);

    return {
        ...jest.requireActual("framer-motion"),
        LazyMotion: ({ children }: { children: React.ReactNode }) => children,
        domAnimation: () => Promise.resolve(),
        AnimatePresence: FakeAnimatePresence,
        motion: {
            div: (() => {
                const Div = React.forwardRef((props: any, ref: any) => {
                    const { initial, animate, exit, transition, ...rest } =
                        props;
                    return React.createElement("div", { ...rest, ref });
                });
                Div.displayName = "MockMotionDiv";
                return Div;
            })(),
            span: (() => {
                const Span = React.forwardRef((props: any, ref: any) => {
                    const {
                        initial,
                        animate,
                        exit,
                        transition,
                        onAnimationComplete,
                        ...rest
                    } = props;
                    return React.createElement("span", { ...rest, ref });
                });
                Span.displayName = "MockMotionSpan";
                return Span;
            })(),
        },
        m: {
            div: "div",
            span: "span",
        },
    };
});
