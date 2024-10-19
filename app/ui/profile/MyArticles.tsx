import { ArticleWithImage } from '@/app/lib/definitions'
import React from 'react'
import ArticleCard from '@/app/ui/blog/ArticleCard'

type Props = {
    articles: ArticleWithImage[];
    userId: number;
}

function MyArticles({ articles, userId }: Props) {
  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {
                        articles.map(arcl => (
                            <ArticleCard userId={userId} editable={true} key={arcl.slug} article={arcl}/>
                        ))
                    }
                    </div>
  )
}

export default MyArticles