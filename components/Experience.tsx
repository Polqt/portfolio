import { Timeline } from './ui/timeline';

export default function Experience() {
    const data = [
        {
            title: '2025',
            content: (
                <div>
                    <p className="text-netural-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Started as a Mobile Developer at K92.
                    </p>
                </div>
            ),
        },
        {
            title: '2024',
            content: (
                <div>
                    <p className="text-netural-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Became a Software Engineer Fellow at{' '}
                        <a
                            href="https://headstarter.co/"
                            target="_blank"
                            rel="noopener"
                        >
                            Headstarter AI
                        </a>
                        .
                    </p>
                </div>
            ),
        },
        {
            title: '2023',
            content: (
                <div>
                    <p className="text-netural-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Worked as a Writer at{' '}
                        <a
                            href="https://stalwrites.com/"
                            target="_blank"
                            rel="noopener"
                        >
                            Stalwrites
                        </a>
                        , creating anime articles, stories, and manhwa content.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            <Timeline data={data} />
        </div>
    );
}
