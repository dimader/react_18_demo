import { memo, useState, useTransition } from 'react';

export function TabContainer() {
    const [isPending, startTransition] = useTransition();
    const [tab, setTab] = useState('about');

    function selectTab(nextTab: string) {
        startTransition(() => {
            setTab(nextTab);
        });
    }

    return (
        <>
            <hr />
            <TabButton
                isActive={tab === 'about'}
                onClick={() => selectTab('about')}
            >
                About
            </TabButton>
            <TabButton
                isActive={tab === 'posts'}
                onClick={() => selectTab('posts')}
            >
                Posts (slow)
            </TabButton>
            <TabButton
                isActive={tab === 'contact'}
                onClick={() => selectTab('contact')}
            >
                Contact
            </TabButton>
            <hr />
            {tab === 'about' && <AboutTab />}
            {tab === 'posts' && <PostsTab />}
            {tab === 'contact' && <ContactTab />}
        </>
    );
}

const PostsTab = memo(function PostsTab() {
    // Log once. The actual slowdown is inside SlowPost.
    console.log('[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />');

    let items = [];
    for (let i = 0; i < 500; i++) {
        items.push(<SlowPost key={i} index={i} />);
    }
    return (
        <ul className="items">
            {items}
        </ul>
    );
});
type PostsParam = {
    index: number
}
function SlowPost({ index }: PostsParam) {
    let startTime = performance.now();
    while (performance.now() - startTime < 1) {
        // Do nothing for 1 ms per item to emulate extremely slow code
    }

    return (
        <li className="item">
            Post #{index + 1}
        </li>
    );
}

type TabParams = {
    children?: string,
    isActive: boolean,
    onClick: () => void
}
export function TabButton({ children, isActive, onClick }: TabParams) {
    if (isActive) {
        return <b>{children}</b>
    }
    return (
        <button onClick={() => {
            onClick();
        }}>
            {children}
        </button>
    )
}


export function AboutTab() {
    return (
        <p>Welcome to my profile!</p>
    );
}

export function ContactTab() {
    return (
        <>
            <p>
                You can find me online here:
            </p>
            <ul>
                <li>admin@mysite.com</li>
                <li>+123456789</li>
            </ul>
        </>
    );
}
