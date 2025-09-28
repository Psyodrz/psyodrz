'use client';

import { useState, useEffect } from 'react';
import { Github, Star, GitFork, Eye, ExternalLink } from 'lucide-react';

interface GitHubRepoData {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  updated_at: string;
  html_url: string;
  homepage?: string;
}

interface GitHubRepoCardProps {
  repoUrl: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  className?: string;
}

export default function GitHubRepoCard({ 
  repoUrl, 
  title, 
  description, 
  tags, 
  color,
  className = '' 
}: GitHubRepoCardProps) {
  const [repoData, setRepoData] = useState<GitHubRepoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract owner and repo name from GitHub URL
  const getRepoInfo = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) {
      return { owner: match[1], repo: match[2] };
    }
    return null;
  };

  useEffect(() => {
    const repoInfo = getRepoInfo(repoUrl);
    if (!repoInfo) {
      setError('Invalid GitHub URL');
      setLoading(false);
      return;
    }

    const fetchRepoData = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`);
        if (!response.ok) {
          throw new Error('Failed to fetch repository data');
        }
        const data = await response.json();
        setRepoData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [repoUrl]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'JavaScript': '#f7df1e',
      'TypeScript': '#3178c6',
      'Python': '#3776ab',
      'Java': '#f89820',
      'C#': '#239120',
      'C++': '#00599c',
      'HTML': '#e34f26',
      'CSS': '#1572b6',
      'React': '#61dafb',
      'Node.js': '#339933',
      'Vue': '#4fc08d',
      'Angular': '#dd0031',
      'Go': '#00add8',
      'Rust': '#000000',
      'PHP': '#777bb4',
      'Ruby': '#cc342d',
      'Swift': '#fa7343',
      'Kotlin': '#7f52ff',
      'Dart': '#0175c2',
      'Shell': '#89e051',
      'PowerShell': '#012456',
      'Dockerfile': '#2496ed',
      'YAML': '#cb171e',
      'JSON': '#000000',
      'Markdown': '#083fa1'
    };
    return colors[language] || '#6b7280';
  };

  if (loading) {
    return (
      <article className={`group rounded-xl border bg-card p-6 transition-colors hover:border-primary/40 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded mb-3"></div>
          <div className="h-4 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded mb-4 w-3/4"></div>
          <div className="flex gap-2 mb-4">
            <div className="h-6 bg-muted rounded w-16"></div>
            <div className="h-6 bg-muted rounded w-20"></div>
            <div className="h-6 bg-muted rounded w-14"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-8 bg-muted rounded w-20"></div>
            <div className="h-8 bg-muted rounded w-24"></div>
          </div>
        </div>
      </article>
    );
  }

  if (error || !repoData) {
    return (
      <article className={`group rounded-xl border bg-card p-6 transition-colors hover:border-primary/40 ${className}`}>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="inline-flex items-center rounded-full border border-border/80 bg-card/60 px-3 py-1 text-sm text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glow inline-flex items-center rounded-md bg-secondary/40 px-3 py-1.5 text-sm hover:bg-secondary/60"
          >
            <Github className="w-4 h-4 mr-2" />
            View Code
          </a>
        </div>
      </article>
    );
  }

  return (
    <article className={`group rounded-xl border bg-card p-4 sm:p-6 transition-colors hover:border-primary/40 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg sm:text-xl font-medium pr-2">{repoData.name}</h3>
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground flex-shrink-0">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">{repoData.stargazers_count}</span>
            <span className="xs:hidden">{repoData.stargazers_count > 1000 ? `${Math.round(repoData.stargazers_count/1000)}k` : repoData.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">{repoData.forks_count}</span>
            <span className="xs:hidden">{repoData.forks_count > 1000 ? `${Math.round(repoData.forks_count/1000)}k` : repoData.forks_count}</span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
        {repoData.description || description}
      </p>
      
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
        {tags.slice(0, 4).map((tag) => (
          <span key={tag} className="inline-flex items-center rounded-full border border-border/80 bg-card/60 px-2 py-1 text-xs sm:text-sm text-muted-foreground">
            {tag}
          </span>
        ))}
        {tags.length > 4 && (
          <span className="inline-flex items-center rounded-full border border-border/80 bg-card/60 px-2 py-1 text-xs sm:text-sm text-muted-foreground">
            +{tags.length - 4}
          </span>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 text-xs sm:text-sm text-muted-foreground gap-2">
        <div className="flex items-center gap-2 sm:gap-4">
          {repoData.language && (
            <div className="flex items-center gap-1 sm:gap-2">
              <div 
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
                style={{ backgroundColor: getLanguageColor(repoData.language) }}
              ></div>
              <span className="text-xs sm:text-sm">{repoData.language}</span>
            </div>
          )}
        </div>
        <span className="text-xs sm:text-sm">Updated {formatDate(repoData.updated_at)}</span>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <a
          href={repoData.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="glow inline-flex items-center justify-center rounded-md bg-secondary/40 px-3 py-2 sm:py-1.5 text-sm hover:bg-secondary/60 transition-colors"
        >
          <Github className="w-4 h-4 mr-2" />
          View Code
        </a>
        {repoData.homepage && (
          <a
            href={repoData.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="glow inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 sm:py-1.5 text-sm text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}
