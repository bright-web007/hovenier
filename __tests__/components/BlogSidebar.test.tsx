/**
 * Unit tests for BlogSidebar component
 * 
 * Tests the layout, category links with localization, newsletter form,
 * and popular articles functionality.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import type { ReactNode } from 'react';
import BlogSidebar from '../../app/components/BlogSidebar';
import { localizePath } from '../../lib/locale-utils';

// Mock next/link
jest.mock('next/link', () => {
  const MockNextLink = ({ children, href, className }: { children: ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );

  MockNextLink.displayName = 'MockNextLink';

  return MockNextLink;
});

// Mock locale-utils
jest.mock('../../lib/locale-utils', () => ({
  localizePath: jest.fn(),
}));

const mockLocalizePath = localizePath as jest.MockedFunction<typeof localizePath>;

describe('BlogSidebar', () => {
  const mockCategories = [
    { name: 'Tuinonderhoud', slug: 'tuinonderhoud', count: 15 },
    { name: 'Tuinontwerp', slug: 'tuinontwerp', count: 8 },
    { name: 'Groendaken', slug: 'groendaken', count: 12 },
  ];

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup default mock behavior
    mockLocalizePath.mockImplementation((path: string, locale: string) => {
      return locale === 'en' ? `/en${path}` : path;
    });
  });

  describe('Component Structure', () => {
    test('should render all widget sections', () => {
      render(<BlogSidebar categories={mockCategories} locale="nl" />);
      
      expect(screen.getByText('Categorieën')).toBeInTheDocument();
      expect(screen.getByText('Tuinnieuwsbrief')).toBeInTheDocument();
      expect(screen.getByText('Populaire Artikelen')).toBeInTheDocument();
      expect(screen.getByText('Advies Nodig?')).toBeInTheDocument();
    });

    test('should render with correct CSS classes', () => {
      const { container } = render(<BlogSidebar categories={mockCategories} locale="nl" />);
      
      expect(container.firstChild).toHaveClass('sidebar');
      expect(screen.getByText('Tuinnieuwsbrief').closest('div')).toHaveClass('widget', 'newsletterWidget');
      expect(screen.getByText('Advies Nodig?').closest('div')).toHaveClass('widget', 'contactWidget');
    });
  });

  describe('Categories Widget', () => {
    test('should render all categories with names and counts', () => {
      render(<BlogSidebar categories={mockCategories} locale="nl" />);
      
      mockCategories.forEach(category => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
        expect(screen.getByText(category.count.toString())).toBeInTheDocument();
      });
    });

    test('should generate localized category links for Dutch locale', () => {
      render(<BlogSidebar categories={mockCategories} locale="nl" />);
      
      mockCategories.forEach(category => {
        expect(mockLocalizePath).toHaveBeenCalledWith(
          `/nieuws/categorie/${category.slug}`,
          'nl'
        );
      });
    });

    test('should generate localized category links for English locale', () => {
      render(<BlogSidebar categories={mockCategories} locale="en" />);
      
      mockCategories.forEach(category => {
        expect(mockLocalizePath).toHaveBeenCalledWith(
          `/nieuws/categorie/${category.slug}`,
          'en'
        );
      });
    });

    test('should create proper link elements with correct hrefs', () => {
      mockLocalizePath
        .mockReturnValueOnce('/nieuws/categorie/tuinonderhoud')
        .mockReturnValueOnce('/nieuws/categorie/tuinontwerp') 
        .mockReturnValueOnce('/nieuws/categorie/groendaken');

      render(<BlogSidebar categories={mockCategories} locale="nl" />);
      
      expect(screen.getByText('Tuinonderhoud').closest('a')).toHaveAttribute(
        'href',
        '/nieuws/categorie/tuinonderhoud'
      );
      expect(screen.getByText('Tuinontwerp').closest('a')).toHaveAttribute(
        'href',
        '/nieuws/categorie/tuinontwerp'
      );
      expect(screen.getByText('Groendaken').closest('a')).toHaveAttribute(
        'href',
        '/nieuws/categorie/groendaken'
      );
    });

    test('should handle empty categories array', () => {
      render(<BlogSidebar categories={[]} locale="nl" />);
      
      expect(screen.getByText('Categorieën')).toBeInTheDocument();
      // Should still show the section but with no category items
      const categoryList = screen.getByText('Categorieën').nextElementSibling;
      expect(categoryList).toHaveClass('categoryList');
      expect(categoryList?.children).toHaveLength(0);
    });
  });

  describe('Newsletter Widget', () => {
    test('should render newsletter form elements', () => {
      render(<BlogSidebar categories={mockCategories} locale="nl" />);
      
      expect(screen.getByText('Tuinnieuwsbrief')).toBeInTheDocument();
      expect(screen.getByText('Ontvang maandelijks de beste tuintips en seizoensadvies in je inbox.')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Je email adres')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Aanmelden' })).toBeInTheDocument();
    });

    test('should have correct input types and accessibility', () => {
      render(<BlogSidebar categories={mockCategories} locale="nl" />);
      
      const emailInput = screen.getByPlaceholderText('Je email adres');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveClass('newsletterInput');
      
      const submitButton = screen.getByRole('button', { name: 'Aanmelden' });
      expect(submitButton).toHaveClass('newsletterButton');
    });

    test('should accept user input in email field', () => {
      render(<BlogSidebar categories={mockCategories} locale="nl" />);
      
      const emailInput = screen.getByPlaceholderText('Je email adres') as HTMLInputElement;
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      expect(emailInput.value).toBe('test@example.com');
    });

    test.todo('should handle form submission when onSubmit handler is added');
    // Note: Currently the form has no onSubmit handler - this is a UX gap
  });

  describe('Popular Articles Widget', () => {
    const expectedArticles = [
      { title: "Wat kost een hovenier per uur?", date: "15 maart 2024" },
      { title: "5 fouten bij tuinonderhoud", date: "10 maart 2024" },
      { title: "Groendak subsidies 2024", date: "8 maart 2024" }
    ];

    test('should render all popular articles with titles and dates', () => {
      render(<BlogSidebar categories={mockCategories} locale="nl" />);
      
      expectedArticles.forEach(article => {
        expect(screen.getByText(article.title)).toBeInTheDocument();
        expect(screen.getByText(article.date)).toBeInTheDocument();
      });
    });

    test('should render articles as anchor elements', () => {
      render(<BlogSidebar categories={mockCategories} locale="nl" />);
      
      expectedArticles.forEach(article => {
        const titleElement = screen.getByText(article.title);
        const linkElement = titleElement.closest('a');
        
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveClass('popularItem');
      });
    });

    test.todo('should have proper article links instead of href="#"');
    // Note: Currently all articles link to '#' - this is a UX gap that should be addressed
  });

  describe('Contact Widget', () => {
    test('should render contact information and CTA', () => {
      render(<BlogSidebar categories={mockCategories} locale="nl" />);
      
      expect(screen.getByText('Advies Nodig?')).toBeInTheDocument();
      expect(screen.getByText('Krijg direct antwoord op je tuinvragen van lokale experts.')).toBeInTheDocument();
      expect(screen.getByText('Gratis Advies →')).toBeInTheDocument();
    });

    test('should generate localized contact link', () => {
      render(<BlogSidebar categories={mockCategories} locale="en" />);
      
      expect(mockLocalizePath).toHaveBeenCalledWith('/#lead-form', 'en');
    });

    test('should render contact button with correct href', () => {
      mockLocalizePath.mockReturnValueOnce('/en/#lead-form');
      
      render(<BlogSidebar categories={mockCategories} locale="en" />);
      
      const contactButton = screen.getByText('Gratis Advies →');
      expect(contactButton.closest('a')).toHaveAttribute('href', '/en/#lead-form');
    });
  });

  describe('Locale Handling', () => {
    test('should handle different locale formats correctly', () => {
      render(<BlogSidebar categories={mockCategories} locale="en" />);
      
      // Should have called localizePath for each category plus the contact link
      expect(mockLocalizePath).toHaveBeenCalledTimes(mockCategories.length + 1);
      
      // All calls should use the 'en' locale
      mockLocalizePath.mock.calls.forEach(call => {
        expect(call[1]).toBe('en');
      });
    });

    test('should work with Dutch locale as default', () => {
      render(<BlogSidebar categories={mockCategories} locale="nl" />);
      
      mockLocalizePath.mock.calls.forEach(call => {
        expect(call[1]).toBe('nl');
      });
    });
  });

  describe('Component Props Validation', () => {
    test('should handle various category count formats', () => {
      const categoriesWithDifferentCounts = [
        { name: 'Test 1', slug: 'test-1', count: 0 },
        { name: 'Test 2', slug: 'test-2', count: 999 },
        { name: 'Test 3', slug: 'test-3', count: 1 },
      ];
      
      render(<BlogSidebar categories={categoriesWithDifferentCounts} locale="nl" />);
      
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('999')).toBeInTheDocument(); 
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    test('should handle categories with special characters', () => {
      const specialCategories = [
        { name: 'Café & Terras', slug: 'cafe-terras', count: 5 },
        { name: 'Zwembad/Spa', slug: 'zwembad-spa', count: 3 },
      ];
      
      render(<BlogSidebar categories={specialCategories} locale="nl" />);
      
      expect(screen.getByText('Café & Terras')).toBeInTheDocument();
      expect(screen.getByText('Zwembad/Spa')).toBeInTheDocument();
    });
  });
});