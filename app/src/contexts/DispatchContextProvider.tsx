import { ReactNode } from "react";
import { DispatchProvider, DispatchAppProps } from "@usedispatch/forum";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import "@usedispatch/forum/dist/style.css";

interface Props {
    baseURL: string;
    forumURL: string;
    topicURL: string;
    children?: ReactNode | ReactNode[];
}

const DispatchApp = ({ 
    baseURL,
    forumURL,
    topicURL,
    children, 
    ...props
}: Props) => {
    const { connection } = useConnection();
    const wallet = useWallet();

    function buildForumPath(collectionId: string) {
        return `${baseURL}${forumURL}/${collectionId}`;
    }
    
    function buildTopicPath(collectionId: string, topicId: number) {
        return `${baseURL}${forumURL}/${collectionId}${topicURL}/${topicId}`;
    }

    const dispatchProps : DispatchAppProps = {
        wallet: wallet,
        connection: connection,
        buildForumPath: buildForumPath,
        buildTopicPath: buildTopicPath,
        children: children,
        cluster: "devnet"
    }

    return (
        <DispatchProvider {...dispatchProps}>
            {children}
        </DispatchProvider>
    )
}

export default DispatchApp;