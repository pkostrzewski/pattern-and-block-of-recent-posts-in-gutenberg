import { registerBlockType } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

const cleanExcerpt = (excerpt) => {
    return excerpt.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, ' ').trim();
};

const truncateExcerpt = (excerpt, wordLimit) => {
    const cleanedExcerpt = cleanExcerpt(excerpt);
    const words = cleanedExcerpt.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : cleanedExcerpt;
};

registerBlockType('recruitment-task/latest-posts', {
    title: 'Latest Posts',
    category: 'widgets',
    attributes: {
        superscription: { type: 'string', default: 'latest posts' },
        title: { type: 'string', default: 'Lorem ipsum dolor sit amet...' },
        text: { type: 'string', default: 'View all posts' },
        link: { type: 'string', default: '/url-view-all-posts' },
        order: { type: 'string', default: 'DESC' },
        posts: { type: 'array', default: [] },
    },
    edit({ attributes, setAttributes }) {
        const { title, superscription, text, link, order } = attributes;

        useEffect(() => {
            apiFetch({
                path: `/wp/v2/posts?_embed&per_page=4&_orderby=date&_order=${order}`
            }).then((fetchedPosts) => {
                console.log('Fetched Posts:', fetchedPosts);
                
                // Separate pinned posts
                const pinnedPosts = fetchedPosts.filter(post => post.sticky);
                const regularPosts = fetchedPosts.filter(post => !post.sticky);

                // Combine pinned posts with others
                const sortedPosts = [...pinnedPosts, ...regularPosts].slice(0, 4);

                setAttributes({ posts: sortedPosts });
            }).catch((error) => {
                console.error('Error fetching posts:', error);
            });
        }, [order]);

        return (
            <section className="wp-block-reqruitment-task-latest-posts">
                <div className="wrapper">
                    <InspectorControls>
                        <PanelBody title="Settings">
                            <SelectControl
                                label="Order"
                                value={order}
                                options={[
                                    { label: 'Ascending (ASC)', value: 'ASC' },
                                    { label: 'Descending (DESC)', value: 'DESC' },
                                ]}
                                onChange={(value) => setAttributes({ order: value })}
                            />
                        </PanelBody>
                    </InspectorControls>
                    <div className="section-header">
                        <div className="heading">
                            <RichText
                                tagName="span"
                                value={superscription}
                                onChange={(value) => setAttributes({ superscription: value })}
                                placeholder="Superscription"
                            />
                            <RichText
                                tagName="h2"
                                value={title}
                                onChange={(value) => setAttributes({ title: value })}
                                placeholder="Title"
                            />
                        </div>
                        <div className="view-all-posts">
                            <div className="view-all-posts-label">
                                <RichText
                                    tagName="p"
                                    value={text}
                                    onChange={(value) => setAttributes({ text: value })}
                                    placeholder="Text for 'View all posts'"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" viewBox="0 0 6 12" fill="none">
                                    <path d="M5.64645 5.64645C5.84171 5.84171 5.84171 6.15829 5.64645 6.35355L0.853552 11.1464C0.53857 11.4614 -1.44492e-06 11.2383 -1.42545e-06 10.7929L-1.00644e-06 1.20711C-9.86967e-07 0.761654 0.53857 0.538571 0.853552 0.853553L5.64645 5.64645Z" fill="#22B4AB"/>
                                </svg>
                            </div>
                            <RichText
                                tagName="a"
                                value={link}
                                onChange={(value) => setAttributes({ link: value })}
                                placeholder="Link for 'View all posts'"
                            />
                        </div>
                    </div>
                    <div className="latest-posts">
                        {attributes.posts && attributes.posts.length > 0 ? (
                            attributes.posts.map((post) => (
                                <div className="post" key={post.id}>
                                    <div className="thumbnail">
                                        {post._embedded && post._embedded['wp:featuredmedia'] && (
                                            <>
                                                <img 
                                                    src={post._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} 
                                                    alt={post.title.rendered}
                                                    className="post-thumbnail"
                                                />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="175" height="178" viewBox="0 0 175 178" fill="none">
                                                    <path d="M0 1.5299e-05L3.02464e-07 178L175 178L0 1.5299e-05Z"/>
                                                </svg>
                                            </>
                                        )}
                                    </div>
                                    <div className="details">
                                        <div className="details-contents">
                                            {post.sticky && (
                                                <div className="featured-post">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                                                        <path d="M6.5 1.61803L7.48381 4.6459L7.59607 4.99139H7.95934H11.143L8.56737 6.86271L8.27348 7.07624L8.38573 7.42173L9.36955 10.4496L6.79389 8.57827L6.5 8.36475L6.20611 8.57827L3.63045 10.4496L4.61426 7.42173L4.72652 7.07624L4.43263 6.86271L1.85697 4.99139H5.04066H5.40393L5.51619 4.6459L6.5 1.61803Z" stroke="#FF4043"/>
                                                    </svg>
                                                    <span>Featured post</span>
                                                </div>
                                            )}
                                            <a href={post.link}><h3>{post.title.rendered}</h3></a>
                                            <p>{truncateExcerpt(cleanExcerpt(post.excerpt.rendered), 15)}</p>
                                        </div>
                                        <a href={post.link} className="read-more">Read more</a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No posts found.</p>
                        )}
                    </div>
                </div>
            </section>
        );
    },    
    save() {
        return null; // Dynamic block does not write HTML on the editor side
    },
});