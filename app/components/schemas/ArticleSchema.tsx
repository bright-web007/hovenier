interface ArticleSchemaProps {
  headline: string;
  description: string;
  author: {
    name: string;
  };
  publisher: {
    name: string;
    url: string;
  };
  datePublished: string;
  dateModified?: string;
  url: string;
}

export default function ArticleSchema({
  headline,
  description,
  author,
  publisher,
  datePublished,
  dateModified,
  url
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: {
      "@type": "Person",
      name: author.name
    },
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      url: publisher.url
    },
    datePublished,
    dateModified: dateModified || datePublished,
    url
  };

  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}