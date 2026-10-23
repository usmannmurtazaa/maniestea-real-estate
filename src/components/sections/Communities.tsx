import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { CommunityCard } from '../ui/CommunityCard';
import { communities } from '../../data/site';
import { cn } from '../../lib/utils';

const spans = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
];

type CommunitiesProps = {
  onSelectCommunity: (location: string) => void;
};

export function Communities({ onSelectCommunity }: CommunitiesProps) {
  return (
    <section
      id="communities"
      className="bg-ivory-100 py-24 lg:py-32"
      aria-labelledby="communities-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="communities-heading"
          eyebrow="Destinations"
          title="Explore Dubai communities"
          description="Each area has a distinct rhythm. Start with the lifestyle you want, then narrow the property search."
        />

        <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-12">
          {communities.map((community, index) => (
            <Reveal
              key={community.id}
              delay={index * 70}
              className={cn('h-full', spans[index])}
            >
              <CommunityCard
                community={community}
                onSelect={onSelectCommunity}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}